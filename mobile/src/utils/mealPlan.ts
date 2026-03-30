import type { Meal, MealPlanDay } from "../api/mealPlan";

const SLOTS = ["breakfast", "lunch", "dinner"] as const;

export type MealSlot = (typeof SLOTS)[number];

export function mealsForDay(day: MealPlanDay): { slot: MealSlot; meal: Meal }[] {
  return [
    { slot: "breakfast", meal: day.breakfast },
    { slot: "lunch", meal: day.lunch },
    { slot: "dinner", meal: day.dinner },
  ];
}

export function allMealsFromPlan(plan: MealPlanDay[]): Meal[] {
  return plan.flatMap((d) => mealsForDay(d).map(({ meal }) => meal));
}

export function dayTotals(day: MealPlanDay): { calories: number; protein: number } {
  const meals = mealsForDay(day).map(({ meal }) => meal);
  return {
    calories: meals.reduce((s, m) => s + m.calories, 0),
    protein: Math.round(meals.reduce((s, m) => s + m.protein, 0)),
  };
}

export function slotLabel(slot: MealSlot): string {
  switch (slot) {
    case "breakfast":
      return "Breakfast";
    case "lunch":
      return "Lunch";
    case "dinner":
      return "Dinner";
    default:
      return slot;
  }
}

export function mealForSlot(day: MealPlanDay, slot: MealSlot): Meal {
  return day[slot];
}

/** IDs of the other two meals on the same day (avoid duplicate dishes when possible). */
export function otherMealIds(day: MealPlanDay, slot: MealSlot): string[] {
  const ids: string[] = [];
  if (slot !== "breakfast") ids.push(day.breakfast.id);
  if (slot !== "lunch") ids.push(day.lunch.id);
  if (slot !== "dinner") ids.push(day.dinner.id);
  return ids;
}
