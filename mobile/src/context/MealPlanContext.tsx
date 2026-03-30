import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { Meal, MealPlanDay } from "../api/mealPlan";
import type { MealSlot } from "../utils/mealPlan";

type MealPlanContextValue = {
  plan: MealPlanDay[] | null;
  daysToGenerate: number;
  setMealPlan: (nextPlan: MealPlanDay[], days: number) => void;
  clearMealPlan: () => void;
  replaceMeal: (dayIndex: number, slot: MealSlot, meal: Meal) => void;
};

const MealPlanContext = createContext<MealPlanContextValue | null>(null);

export function MealPlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<MealPlanDay[] | null>(null);
  const [daysToGenerate, setDaysToGenerate] = useState(0);

  const setMealPlan = useCallback((nextPlan: MealPlanDay[], days: number) => {
    setPlan(nextPlan);
    setDaysToGenerate(days);
  }, []);

  const clearMealPlan = useCallback(() => {
    setPlan(null);
    setDaysToGenerate(0);
  }, []);

  const replaceMeal = useCallback(
    (dayIndex: number, slot: MealSlot, meal: Meal) => {
      setPlan((prev) => {
        if (!prev) return prev;
        const next = [...prev];
        const row = { ...next[dayIndex] };
        if (slot === "breakfast") row.breakfast = meal;
        else if (slot === "lunch") row.lunch = meal;
        else row.dinner = meal;
        next[dayIndex] = row;
        return next;
      });
    },
    []
  );

  const value = useMemo(
    () => ({
      plan,
      daysToGenerate,
      setMealPlan,
      clearMealPlan,
      replaceMeal,
    }),
    [plan, daysToGenerate, setMealPlan, clearMealPlan, replaceMeal]
  );

  return (
    <MealPlanContext.Provider value={value}>{children}</MealPlanContext.Provider>
  );
}

export function useMealPlan(): MealPlanContextValue {
  const ctx = useContext(MealPlanContext);
  if (!ctx) {
    throw new Error("useMealPlan must be used within MealPlanProvider");
  }
  return ctx;
}
