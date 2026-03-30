export type BudgetLevel = "low" | "medium" | "high";

export interface NutrientGoals {
  calories: number;
  protein: number;
}

export interface UserProfile {
  equipment: string[];
  diets: string[];
  budgetLevel: BudgetLevel;
  weeklyRunFrequency: number;
  nutrientGoals?: NutrientGoals;
}
