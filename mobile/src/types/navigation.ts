import { UserProfile } from "./profile";
import { MealPlanDay } from "../api/mealPlan";

export type RootStackParamList = {
  Loading: undefined;
  Home: undefined;
  Onboarding: { initialProfile?: UserProfile; isEditing?: boolean } | undefined;
  Confirmation: undefined;
  MealPlan: { plan: MealPlanDay[]; daysToGenerate: number };
  GroceryList: { plan: MealPlanDay[] };
  IngredientBreakdown: { plan: MealPlanDay[]; dismissed: string[] };
};
