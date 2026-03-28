import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";

const router = Router();

const VALID_BUDGET_LEVELS = ["low", "medium", "high"] as const;
type BudgetLevel = (typeof VALID_BUDGET_LEVELS)[number];

interface CreateProfileBody {
  equipment: string[];
  diets: string[];
  budgetLevel: BudgetLevel;
  weeklyRunFrequency: number;
}

// POST /api/user/profile
router.post("/", async (req: Request, res: Response) => {
  const { equipment, diets, budgetLevel, weeklyRunFrequency } =
    req.body as CreateProfileBody;

  if (!Array.isArray(equipment) || !Array.isArray(diets)) {
    return res
      .status(400)
      .json({ error: "equipment and diets must be arrays." });
  }

  if (!VALID_BUDGET_LEVELS.includes(budgetLevel)) {
    return res
      .status(400)
      .json({ error: `budgetLevel must be one of: ${VALID_BUDGET_LEVELS.join(", ")}.` });
  }

  if (
    typeof weeklyRunFrequency !== "number" ||
    !Number.isInteger(weeklyRunFrequency) ||
    weeklyRunFrequency < 1
  ) {
    return res
      .status(400)
      .json({ error: "weeklyRunFrequency must be a positive integer." });
  }

  const profile = await prisma.userProfile.create({
    data: { equipment, diets, budgetLevel, weeklyRunFrequency },
  });

  return res.status(201).json(profile);
});

// PUT /api/user/profile
// Updates the most recently created profile in place.
router.put("/", async (req: Request, res: Response) => {
  const { equipment, diets, budgetLevel, weeklyRunFrequency } =
    req.body as CreateProfileBody;

  if (!Array.isArray(equipment) || !Array.isArray(diets)) {
    return res
      .status(400)
      .json({ error: "equipment and diets must be arrays." });
  }

  if (!VALID_BUDGET_LEVELS.includes(budgetLevel)) {
    return res
      .status(400)
      .json({ error: `budgetLevel must be one of: ${VALID_BUDGET_LEVELS.join(", ")}.` });
  }

  if (
    typeof weeklyRunFrequency !== "number" ||
    !Number.isInteger(weeklyRunFrequency) ||
    weeklyRunFrequency < 1
  ) {
    return res
      .status(400)
      .json({ error: "weeklyRunFrequency must be a positive integer." });
  }

  const existing = await prisma.userProfile.findFirst({
    orderBy: { createdAt: "desc" },
  });

  if (!existing) {
    return res.status(404).json({ error: "No profile found to update." });
  }

  const updated = await prisma.userProfile.update({
    where: { id: existing.id },
    data: { equipment, diets, budgetLevel, weeklyRunFrequency },
  });

  return res.json(updated);
});

// GET /api/user/profile
// Returns the most recently created profile (single-user MVP).
router.get("/", async (_req: Request, res: Response) => {
  const profile = await prisma.userProfile.findFirst({
    orderBy: { createdAt: "desc" },
  });

  if (!profile) {
    return res.status(404).json({ error: "No profile found." });
  }

  return res.json(profile);
});

export default router;
