import { UserProfile } from "../types/profile";

// BASE_URL is set via EXPO_PUBLIC_API_URL in mobile/.env
// This should be your machine's local IP + port (e.g. http://192.168.2.14:3000)
// Copy mobile/.env.example to mobile/.env and fill in your IP before running.
// Never commit .env — it's gitignored.
const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

export interface Meal {
  id: string;
  name: string;
  description: string;
  equipment: string[];
  diets: string[];
  budget: "low" | "medium" | "high";
  ingredients: string[];
  calories: number;
  protein: number;
}

export interface MealPlanDay {
  day: number;
  meal: Meal;
}

export interface MealPlanResponse {
  daysToGenerate: number;
  plan: MealPlanDay[];
}

export async function generateMealPlan(
  profile: UserProfile
): Promise<MealPlanResponse> {
  const response = await fetch(`${BASE_URL}/api/meal-plan/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error ?? "Failed to generate meal plan.");
  }

  return response.json();
}
