// Maps Spoonacular equipment strings → your app's equipment values.
// Spoonacular returns equipment per recipe step, so many terms map to the same appliance.

const EQUIPMENT_MAP: Record<string, string> = {
  // Oven
  oven: "Oven",
  "baking pan": "Oven",
  "baking sheet": "Oven",
  "baking dish": "Oven",
  "roasting pan": "Oven",
  broiler: "Oven",

  // Stovetop
  stove: "Stovetop",
  stovetop: "Stovetop",
  "stove top": "Stovetop",
  pan: "Stovetop",
  pot: "Stovetop",
  skillet: "Stovetop",
  "frying pan": "Stovetop",
  "sauce pan": "Stovetop",
  saucepan: "Stovetop",
  "saute pan: ": "Stovetop",
  wok: "Stovetop",
  "dutch oven": "Stovetop",
  "cast iron pan": "Stovetop",
  "grill pan": "Stovetop",

  // Microwave
  microwave: "Microwave",

  // Air Fryer
  "air fryer": "Air Fryer",

  // Blender
  blender: "Blender",
  "food processor": "Blender",
  "immersion blender": "Blender",

  // Instant Pot
  "instant pot": "Instant Pot",
  "pressure cooker": "Instant Pot",
  "slow cooker": "Instant Pot",
  "multi cooker": "Instant Pot",

  // Rice Cooker
  "rice cooker": "Rice Cooker",

  // Toaster
  toaster: "Toaster",
  "toaster oven": "Toaster",
};

/**
 * Given a list of raw Spoonacular equipment strings, returns the
 * deduplicated set of your app's equipment values.
 */
export function normalizeEquipment(spoonacularEquipment: string[]): string[] {
  const result = new Set<string>();
  for (const raw of spoonacularEquipment) {
    const mapped = EQUIPMENT_MAP[raw.toLowerCase().trim()];
    if (mapped) result.add(mapped);
  }
  return Array.from(result);
}
