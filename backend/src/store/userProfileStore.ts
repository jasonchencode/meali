import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export interface StoredUserProfile {
  equipment: string[];
  diets: string[];
  budgetLevel: "low" | "medium" | "high";
  weeklyRunFrequency: number;
  createdAt: string;
  updatedAt: string;
}

const dataDir = path.resolve(__dirname, "../../data");
const profilePath = path.join(dataDir, "user-profile.json");

export async function readUserProfile(): Promise<StoredUserProfile | null> {
  try {
    const raw = await readFile(profilePath, "utf8");
    return JSON.parse(raw) as StoredUserProfile;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export async function saveUserProfile(
  profile: Omit<StoredUserProfile, "createdAt" | "updatedAt">
): Promise<StoredUserProfile> {
  const existing = await readUserProfile();
  const now = new Date().toISOString();

  const nextProfile: StoredUserProfile = {
    ...profile,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  await mkdir(dataDir, { recursive: true });
  await writeFile(profilePath, JSON.stringify(nextProfile, null, 2), "utf8");

  return nextProfile;
}
