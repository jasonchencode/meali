import { UserProfile } from "../types/profile";

// Use 10.0.2.2 for Android emulator, localhost for iOS simulator.
// Replace with your machine's local IP when testing on a physical device.
const BASE_URL = "http://192.168.3.1:3000";

export async function getUserProfile(): Promise<UserProfile | null> {
  const response = await fetch(`${BASE_URL}/api/user/profile`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Failed to fetch profile.");
  const data = await response.json();
  return {
    equipment: data.equipment,
    diets: data.diets,
    budgetLevel: data.budgetLevel,
    weeklyRunFrequency: data.weeklyRunFrequency,
  };
}

export async function updateUserProfile(profile: UserProfile): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/user/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error ?? "Failed to update profile.");
  }
}

export async function createUserProfile(profile: UserProfile): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/user/profile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error ?? "Failed to save profile.");
  }
}
