// Maps Spoonacular diet strings → your app's diet values.
// Spoonacular has no concept of Halal/Kosher — recipes with those tags
// cannot be sourced from Spoonacular and must be added manually.

const DIET_MAP: Record<string, string> = {
  vegetarian: "Vegetarian",
  vegan: "Vegan",
  "lacto-vegetarian": "Vegetarian",
  "ovo-vegetarian": "Vegetarian",
  pescetarian: "Pescatarian",
  "gluten free": "Gluten-Free",
  "dairy free": "Dairy-Free",
};

/**
 * Given a list of raw Spoonacular diet strings, returns the
 * deduplicated set of your app's diet values.
 *
 * A recipe with no recognized diets gets an empty array,
 * which the filter treats as compatible with "No restrictions" users only.
 */
export function normalizeDiets(spoonacularDiets: string[]): string[] {
  const result = new Set<string>();
  for (const raw of spoonacularDiets) {
    const mapped = DIET_MAP[raw.toLowerCase().trim()];
    if (mapped) result.add(mapped);
  }
  return Array.from(result);
}
