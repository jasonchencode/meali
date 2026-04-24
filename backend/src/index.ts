import express from "express";
import userProfileRouter from "./routes/userProfile";
import mealPlanRouter from "./routes/mealPlan";
import { fetchSpoonacularMeals } from "./data/spoonacular";
import meals from "./data/meals";

async function start() {
  const fetched = await fetchSpoonacularMeals(60);
  meals.push(...fetched);
  console.log(`Loaded ${meals.length} meals from Spoonacular`);

  const app = express();
  const PORT = process.env.PORT ?? 3000;

  app.use(express.json());
  app.use("/api/user/profile", userProfileRouter);
  app.use("/api/meal-plan", mealPlanRouter);

  app.listen(PORT, () => {
    console.log(`meali backend running on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
