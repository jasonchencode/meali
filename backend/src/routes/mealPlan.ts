import { Router, Request, Response } from "express";
import meals, { Meal } from "../data/meals";

const router = Router();

const BUDGET_RANK: Record<string, number> = { low: 1, medium: 2, high: 3 };

interface GenerateRequestBody {
  equipment: string[];
  diets: string[];
  budgetLevel: "low" | "medium" | "high";
  weeklyRunFrequency: number;
}

export interface MealPlanDay {
  day: number;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
}

function normalizeDiet(diet: string): string {
  return diet.toLowerCase().replace(/\s+/g, "-");
}

function filterMeals(
  equipment: string[],
  diets: string[],
  budgetLevel: "low" | "medium" | "high"
): Meal[] {
  const userEquipment = equipment.map((e) => e.toLowerCase());
  const userDiets = diets.map(normalizeDiet);
  const userBudgetRank = BUDGET_RANK[budgetLevel];
  const hasNoRestrictions = userDiets.includes("no-restrictions") || userDiets.length === 0;

  return meals.filter((meal) => {
    // User must have all required equipment
    const hasEquipment = meal.equipment.every((e) =>
      userEquipment.includes(e.toLowerCase())
    );
    if (!hasEquipment) return false;

    // Meal budget must be within user's budget
    if (BUDGET_RANK[meal.budget] > userBudgetRank) return false;

    // If no dietary restrictions, all meals pass
    if (hasNoRestrictions) return true;

    // Meal must be compatible with all user diets
    return userDiets.every((diet) => meal.diets.includes(diet));
  });
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

/** Prefer a meal not already used that day; fall back to any meal except the current one. */
function pickSwapMeal(
  eligible: Meal[],
  currentMealId: string,
  sameDayMealIds: string[]
): Meal | null {
  const sameDay = new Set(sameDayMealIds);
  let candidates = eligible.filter(
    (m) => m.id !== currentMealId && !sameDay.has(m.id)
  );
  if (candidates.length === 0) {
    candidates = eligible.filter((m) => m.id !== currentMealId);
  }
  if (candidates.length === 0) {
    return null;
  }
  return shuffle(candidates)[0]!;
}

interface SwapRequestBody {
  equipment: string[];
  diets: string[];
  budgetLevel: "low" | "medium" | "high";
  currentMealId: string;
  sameDayMealIds: string[];
}

// POST /api/meal-plan/generate
router.post("/generate", async (req: Request, res: Response) => {
  const { equipment, diets, budgetLevel, weeklyRunFrequency } =
    req.body as GenerateRequestBody;

  if (!Array.isArray(equipment) || !Array.isArray(diets)) {
    return res.status(400).json({ error: "equipment and diets must be arrays." });
  }

  if (!["low", "medium", "high"].includes(budgetLevel)) {
    return res.status(400).json({ error: "Invalid budgetLevel." });
  }

  if (!weeklyRunFrequency || weeklyRunFrequency < 1) {
    return res.status(400).json({ error: "weeklyRunFrequency must be at least 1." });
  }

  const daysToGenerate = Math.ceil(7 / weeklyRunFrequency);
  const eligible = filterMeals(equipment, diets, budgetLevel);

  if (eligible.length === 0) {
    return res.status(422).json({
      error: "No meals match your current profile. Try adjusting your equipment or diet settings.",
    });
  }

  // Three meals per day (breakfast, lunch, dinner). Sequentially draw from a shuffled pool
  // so the same meal is less likely to repeat back-to-back when the pool is large enough.
  const shuffled = shuffle(eligible);
  let mealIndex = 0;
  function nextMeal(): Meal {
    const m = shuffled[mealIndex % shuffled.length];
    mealIndex += 1;
    return m;
  }

  const plan: MealPlanDay[] = Array.from({ length: daysToGenerate }, (_, i) => ({
    day: i + 1,
    breakfast: nextMeal(),
    lunch: nextMeal(),
    dinner: nextMeal(),
  }));

  return res.json({ daysToGenerate, plan });
});

// POST /api/meal-plan/swap
router.post("/swap", async (req: Request, res: Response) => {
  const { equipment, diets, budgetLevel, currentMealId, sameDayMealIds } =
    req.body as SwapRequestBody;

  if (!Array.isArray(equipment) || !Array.isArray(diets)) {
    return res.status(400).json({ error: "equipment and diets must be arrays." });
  }

  if (!["low", "medium", "high"].includes(budgetLevel)) {
    return res.status(400).json({ error: "Invalid budgetLevel." });
  }

  if (typeof currentMealId !== "string" || !currentMealId) {
    return res.status(400).json({ error: "currentMealId is required." });
  }

  if (!Array.isArray(sameDayMealIds)) {
    return res.status(400).json({ error: "sameDayMealIds must be an array." });
  }

  const eligible = filterMeals(equipment, diets, budgetLevel);
  const meal = pickSwapMeal(eligible, currentMealId, sameDayMealIds);

  if (!meal) {
    return res.status(422).json({
      error:
        "No alternative meal matches your profile. Try adjusting equipment or diet in preferences.",
    });
  }

  return res.json({ meal });
});

export default router;
