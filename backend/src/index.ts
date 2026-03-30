import express from "express";
import userProfileRouter from "./routes/userProfile";
import mealPlanRouter from "./routes/mealPlan";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use("/api/user/profile", userProfileRouter);
app.use("/api/meal-plan", mealPlanRouter);

app.listen(PORT, () => {
  console.log(`meali backend running on port ${PORT}`);
});
