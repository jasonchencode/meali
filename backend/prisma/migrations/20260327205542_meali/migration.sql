-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "equipment" TEXT[],
    "diets" TEXT[],
    "budgetLevel" TEXT NOT NULL,
    "weeklyRunFrequency" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);
