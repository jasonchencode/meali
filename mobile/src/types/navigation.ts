import { UserProfile } from "./profile";

export type RootStackParamList = {
  Loading: undefined;
  Home: undefined;
  Onboarding: { initialProfile?: UserProfile; isEditing?: boolean } | undefined;
  Confirmation: undefined;
  MealPlan: undefined;
  GroceryList: undefined;
  IngredientBreakdown: { dismissed: string[] };
  WhereToBuy: undefined;
};
