import { UserProfile } from "../types/profile";

// Use 10.0.2.2 for Android emulator, localhost for iOS simulator.
// Replace with your machine's local IP when testing on a physical device.
const BASE_URL = "http://10.216.220.177:3000";

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
