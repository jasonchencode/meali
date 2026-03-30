import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getUserProfile,
  getWeeklyMealIdeas,
  saveWeeklyMealIdeas,
} from "../api/userProfile";
import { generateMealPlan } from "../api/mealPlan";
import { UserProfile } from "../types/profile";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const BUDGET_LABELS: Record<string, string> = {
  low: "Budget",
  medium: "Moderate",
  high: "Flexible",
};

function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning.";
  if (hour < 18) return "Good afternoon.";
  return "Good evening.";
}

export default function HomeScreen({ navigation }: Props) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [weeklyMeals, setWeeklyMeals] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const drawerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    async function load() {
      try {
        const [profileData, weeklyMealIdeas] = await Promise.all([
          getUserProfile(),
          getWeeklyMealIdeas(),
        ]);
        setProfile(profileData);
        setWeeklyMeals(weeklyMealIdeas);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Reload profile when returning from edit
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const [profileData, weeklyMealIdeas] = await Promise.all([
        getUserProfile(),
        getWeeklyMealIdeas(),
      ]);
      setProfile(profileData);
      setWeeklyMeals(weeklyMealIdeas);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    Animated.timing(drawerAnimation, {
      toValue: drawerVisible ? 1 : 0,
      duration: 240,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [drawerAnimation, drawerVisible]);

  async function handleGenerate() {
    if (!profile) return;
    setGenerating(true);
    try {
      const result = await generateMealPlan(profile);
      navigation.navigate("MealPlan", {
        plan: result.plan,
        daysToGenerate: result.daysToGenerate,
      });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Something went wrong.";
      alert(message);
    } finally {
      setGenerating(false);
    }
  }

  async function handleSaveIdeas() {
    setSaving(true);
    try {
      await saveWeeklyMealIdeas(weeklyMeals.trim());
    } finally {
      setSaving(false);
    }
  }

  const drawerTranslateX = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [320, 0],
  });

  const overlayOpacity = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="small" color="#0D0D0D" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <View>
            <Text style={styles.appName}>meali</Text>
            <Text style={styles.greeting}>{greeting()}</Text>
          </View>
          <TouchableOpacity
            style={styles.preferencesButton}
            activeOpacity={0.8}
            onPress={() => setDrawerVisible(true)}
          >
            <Text style={styles.preferencesButtonLabel}>Prefs</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.promptEyebrow}>Weekly plan</Text>
          <Text style={styles.promptTitle}>
            What are you thinking of eating this week?
          </Text>
          <Text style={styles.promptSubtitle}>
            Add meals, cravings, ingredients, or anything you want to make room
            for.
          </Text>

          <TextInput
            value={weeklyMeals}
            onChangeText={setWeeklyMeals}
            placeholder="Thai curry, chicken wraps, something quick for late nights..."
            placeholderTextColor="#8A8A8A"
            multiline
            textAlignVertical="top"
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.saveButton}
            activeOpacity={0.85}
            onPress={handleSaveIdeas}
            disabled={saving}
          >
            <Text style={styles.saveButtonText}>
              {saving ? "Saving..." : "Save this week"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>Keep it simple</Text>
          <Text style={styles.noteText}>
            Your meal ideas stay on this device. Open preferences from the top
            right whenever you want to review or change your setup.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.generateBtn, generating && styles.generateBtnDisabled]}
          onPress={handleGenerate}
          disabled={generating || !profile}
          activeOpacity={0.85}
        >
          <Text style={styles.generateBtnText}>
            {generating ? "Generating..." : "Generate meal plan"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={drawerVisible}
        transparent
        animationType="none"
        onRequestClose={() => setDrawerVisible(false)}
      >
        <View style={styles.modalRoot}>
          <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
            <Pressable style={styles.overlayPressable} onPress={() => setDrawerVisible(false)} />
          </Animated.View>
          <Animated.View
            style={[
              styles.drawer,
              { transform: [{ translateX: drawerTranslateX }] },
            ]}
          >
            <SafeAreaView style={styles.drawerSafe}>
              <View style={styles.drawerHeader}>
                <Text style={styles.drawerTitle}>Your preferences</Text>
                <TouchableOpacity
                  onPress={() => setDrawerVisible(false)}
                  hitSlop={12}
                >
                  <Text style={styles.drawerClose}>Close</Text>
                </TouchableOpacity>
              </View>

              {profile ? (
                <>
                  <View style={styles.preferenceCard}>
                    <Text style={styles.preferenceTitle}>Kitchen</Text>
                    <Text style={styles.preferenceValue}>
                      {profile.equipment.length > 0
                        ? profile.equipment.join(" · ")
                        : "Nothing selected"}
                    </Text>
                  </View>

                  <View style={styles.preferenceCard}>
                    <Text style={styles.preferenceTitle}>Diet</Text>
                    <Text style={styles.preferenceValue}>
                      {profile.diets.length > 0
                        ? profile.diets.join(" · ")
                        : "No restrictions"}
                    </Text>
                  </View>

                  <View style={styles.preferenceCard}>
                    <Text style={styles.preferenceTitle}>Budget</Text>
                    <Text style={styles.preferenceValue}>
                      {BUDGET_LABELS[profile.budgetLevel] ?? profile.budgetLevel}
                    </Text>
                  </View>

                  <View style={styles.preferenceCard}>
                    <Text style={styles.preferenceTitle}>Shopping cadence</Text>
                    <Text style={styles.preferenceValue}>
                      {profile.weeklyRunFrequency}{" "}
                      {profile.weeklyRunFrequency === 1 ? "run" : "runs"} / week
                    </Text>
                  </View>
                </>
              ) : (
                <Text style={styles.empty}>No preferences saved yet.</Text>
              )}

              <TouchableOpacity
                style={styles.editBtn}
                activeOpacity={0.8}
                onPress={() => {
                  setDrawerVisible(false);
                  navigation.navigate("Onboarding", {
                    initialProfile: profile ?? undefined,
                    isEditing: true,
                  });
                }}
              >
                <Text style={styles.editBtnText}>Change preferences</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F3F0EA" },
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  container: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 48,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 28,
  },
  appName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6F665A",
    letterSpacing: 1.2,
    marginBottom: 10,
    textTransform: "lowercase",
  },
  greeting: {
    fontSize: 32,
    fontWeight: "700",
    color: "#0D0D0D",
    maxWidth: 220,
  },
  preferencesButton: {
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#D8D1C8",
  },
  preferencesButtonLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1D1B18",
  },
  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    padding: 24,
    shadowColor: "#8F877C",
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  promptEyebrow: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7A6F61",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
  },
  promptTitle: {
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "700",
    color: "#0D0D0D",
    marginBottom: 14,
  },
  promptSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: "#5E584F",
    marginBottom: 22,
  },
  input: {
    minHeight: 220,
    borderRadius: 24,
    backgroundColor: "#F7F3EE",
    paddingHorizontal: 18,
    paddingVertical: 18,
    fontSize: 17,
    lineHeight: 26,
    color: "#141312",
    marginBottom: 18,
  },
  saveButton: {
    backgroundColor: "#111111",
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  noteCard: {
    marginTop: 18,
    paddingHorizontal: 6,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1A17",
    marginBottom: 6,
  },
  noteText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#645D54",
  },
  generateBtn: {
    marginTop: 16,
    backgroundColor: "#0D0D0D",
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
  },
  generateBtnDisabled: {
    backgroundColor: "#C8C4BE",
  },
  generateBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  modalRoot: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 13, 10, 0.28)",
  },
  overlayPressable: {
    flex: 1,
  },
  drawer: {
    width: "82%",
    maxWidth: 360,
    backgroundColor: "#FFFDF9",
    borderTopLeftRadius: 28,
    borderBottomLeftRadius: 28,
    paddingHorizontal: 22,
    paddingVertical: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.14,
    shadowRadius: 22,
    shadowOffset: { width: -4, height: 0 },
    elevation: 12,
  },
  drawerSafe: {
    flex: 1,
  },
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#13110F",
  },
  drawerClose: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6A6258",
  },
  preferenceCard: {
    borderWidth: 1,
    borderColor: "#E9E1D7",
    borderRadius: 18,
    padding: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
  },
  preferenceTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7A7066",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 7,
  },
  preferenceValue: {
    fontSize: 15,
    lineHeight: 22,
    color: "#171512",
  },
  empty: {
    fontSize: 15,
    lineHeight: 22,
    color: "#6B6B6B",
    marginTop: 8,
    marginBottom: 20,
  },
  editBtn: {
    marginTop: "auto",
    backgroundColor: "#111111",
    borderRadius: 18,
    paddingVertical: 17,
    alignItems: "center",
  },
  editBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
