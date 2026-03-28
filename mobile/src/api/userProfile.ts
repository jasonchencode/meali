import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProfile } from "../types/profile";

const STORAGE_KEY = "meali:user-profile";
const WEEKLY_MEALS_KEY = "meali:weekly-meals";
// Use 10.0.2.2 for Android emulator, localhost for iOS simulator.
// Replace with your machine's local IP when testing on a physical device.
const BASE_URL = "http://192.168.3.1:3000";

export async function getUserProfile(): Promise<UserProfile | null> {
  const rawProfile = await AsyncStorage.getItem(STORAGE_KEY);
  if (!rawProfile) {
    return null;
  }

  return JSON.parse(rawProfile) as UserProfile;
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
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export async function getWeeklyMealIdeas(): Promise<string> {
  return (await AsyncStorage.getItem(WEEKLY_MEALS_KEY)) ?? "";
}

export async function saveWeeklyMealIdeas(value: string): Promise<void> {
  await AsyncStorage.setItem(WEEKLY_MEALS_KEY, value);
}
