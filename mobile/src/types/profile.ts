export type BudgetLevel = "low" | "medium" | "high";

export interface UserProfile {
  equipment: string[];
  diets: string[];
  budgetLevel: BudgetLevel;
  weeklyRunFrequency: number;
}
