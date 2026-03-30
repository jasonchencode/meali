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
  meal: Meal;
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

  // Shuffle and pick enough meals, cycling if the pool is smaller than daysToGenerate
  const shuffled = shuffle(eligible);
  const plan: MealPlanDay[] = Array.from({ length: daysToGenerate }, (_, i) => ({
    day: i + 1,
    meal: shuffled[i % shuffled.length],
  }));

  return res.json({ daysToGenerate, plan });
});

export default router;
