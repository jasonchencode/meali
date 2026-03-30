const UNITS = [
  "tbsp", "tsp", "cup", "cups", "oz", "lb", "lbs", "g", "kg",
  "ml", "l", "can", "cans", "clove", "cloves", "slice", "slices",
  "sprig", "sprigs", "pinch", "bunch",
];

interface ParsedIngredient {
  quantity: number | null;
  unit: string | null;
  name: string;
  original: string;
}

function parseIngredient(str: string): ParsedIngredient {
  const s = str.trim();

  // Match an optional leading number (integer or fraction like 1/2)
  const numberPattern = /^(\d+(?:\/\d+)?(?:\.\d+)?)\s*/;
  const numberMatch = s.match(numberPattern);

  if (!numberMatch) {
    return { quantity: null, unit: null, name: s.toLowerCase(), original: s };
  }

  const rawNumber = numberMatch[1];
  const quantity = rawNumber.includes("/")
    ? eval(rawNumber) // safe: only matches digit/digit
    : parseFloat(rawNumber);
  const rest = s.slice(numberMatch[0].length);

  // Try to match a known unit next
  const unitPattern = new RegExp(
    `^(${UNITS.join("|")})\\s+`,
    "i"
  );
  const unitMatch = rest.match(unitPattern);

  if (unitMatch) {
    const unit = unitMatch[1].toLowerCase();
    const name = rest.slice(unitMatch[0].length).toLowerCase();
    return { quantity, unit, name, original: s };
  }

  // No unit — the rest is the name
  return { quantity, unit: null, name: rest.toLowerCase(), original: s };
}

function formatIngredient(quantity: number | null, unit: string | null, name: string): string {
  // Format quantity: show as integer if whole number, otherwise 1 decimal place
  const formattedQty =
    quantity === null
      ? null
      : Number.isInteger(quantity)
      ? String(quantity)
      : quantity.toFixed(1);

  let result: string;
  if (formattedQty === null) result = name;
  else if (unit === null) result = `${formattedQty} ${name}`;
  else result = `${formattedQty} ${unit} ${name}`;

  return result;
}

export function mergeIngredients(ingredients: string[]): string[] {
  // key: "name||unit" → accumulated quantity (or null if unparseable)
  const grouped = new Map<string, { quantity: number | null; unit: string | null; name: string }>();

  for (const raw of ingredients) {
    const parsed = parseIngredient(raw);
    const key = `${parsed.name}||${parsed.unit ?? ""}`;

    if (grouped.has(key)) {
      const existing = grouped.get(key)!;
      if (existing.quantity !== null && parsed.quantity !== null) {
        existing.quantity += parsed.quantity;
      }
      // If either has no quantity, keep as-is (already in map)
    } else {
      grouped.set(key, {
        quantity: parsed.quantity,
        unit: parsed.unit,
        name: parsed.name,
      });
    }
  }

  return Array.from(grouped.values()).map(({ quantity, unit, name }) =>
    formatIngredient(quantity, unit, name)
  );
}
