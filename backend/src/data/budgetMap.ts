export function normalizeBudget(pricePerServingCents: number): "low" | "medium" | "high" {
  if (pricePerServingCents < 300) return "low";
  if (pricePerServingCents < 700) return "medium";
  return "high";
}
