import { Meal } from "./meals";
import { normalizeEquipment } from "./equipmentMap";
import { normalizeDiets } from "./dietMap";
import { isHalal, isKosher } from "./dietFilter";
import { normalizeBudget } from "./budgetMap";

const BASE_URL = "https://api.spoonacular.com";
const API_KEY = process.env.SPOONACULAR_API_KEY!;

interface SpoonacularSearchResult {
  id: number;
  title: string;
}

interface SpoonacularRecipe {
  id: number;
  title: string;
  summary: string;
  pricePerServing: number;
  diets: string[];
  image: string;
  extendedIngredients: { original: string }[];
  analyzedInstructions: {
    steps: {
      step: string;
      equipment: { name: string }[];
    }[];
  }[];
  nutrition: {
    nutrients: { name: string; amount: number }[];
  };
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

function getNutrient(nutrients: { name: string; amount: number }[], name: string): number {
  return Math.round(nutrients.find((n) => n.name === name)?.amount ?? 0);
}

export async function fetchSpoonacularMeals(count = 60): Promise<Meal[]> {
  // Step 1: search for recipe IDs
  const searchRes = await fetch(
    `${BASE_URL}/recipes/complexSearch?number=${count}&addRecipeNutrition=false&apiKey=${API_KEY}`
  );
  if (!searchRes.ok) throw new Error(`Spoonacular search failed: ${searchRes.status}`);
  const searchData = await searchRes.json() as { results: SpoonacularSearchResult[] };
  const ids = searchData.results.map((r) => r.id).join(",");

  // Step 2: fetch full details for all IDs in one call
  const bulkRes = await fetch(
    `${BASE_URL}/recipes/informationBulk?ids=${ids}&includeNutrition=true&apiKey=${API_KEY}`
  );
  if (!bulkRes.ok) throw new Error(`Spoonacular bulk fetch failed: ${bulkRes.status}`);
  const recipes = await bulkRes.json() as SpoonacularRecipe[];

  return recipes.map((recipe): Meal => {
    const ingredients = recipe.extendedIngredients.map((i) => i.original);

    const allEquipment = recipe.analyzedInstructions.flatMap((inst) =>
      inst.steps.flatMap((step) => step.equipment.map((e) => e.name))
    );

    const steps = recipe.analyzedInstructions.flatMap((inst) =>
      inst.steps.map((step) => step.step)
    );

    const nutrients = recipe.nutrition?.nutrients ?? [];
    const diets = normalizeDiets(recipe.diets);
    if (isHalal(ingredients)) diets.push("Halal");
    if (isKosher(ingredients)) diets.push("Kosher");

    return {
      id: String(recipe.id),
      name: recipe.title,
      description: stripHtml(recipe.summary).slice(0, 200),
      equipment: normalizeEquipment(allEquipment),
      diets,
      budget: normalizeBudget(recipe.pricePerServing),
      ingredients,
      calories: getNutrient(nutrients, "Calories"),
      protein: getNutrient(nutrients, "Protein"),
      imageUrl: recipe.image,
      recipeSteps: steps,
    };
  });
}
