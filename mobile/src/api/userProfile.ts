import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProfile } from "../types/profile";

const STORAGE_KEY = "meali:user-profile";
const WEEKLY_MEALS_KEY = "meali:weekly-meals";

export async function getUserProfile(): Promise<UserProfile | null> {
  const rawProfile = await AsyncStorage.getItem(STORAGE_KEY);
  if (!rawProfile) {
    return null;
  }

  return JSON.parse(rawProfile) as UserProfile;
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
