import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserProfile } from "../api/userProfile";
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

function SummaryCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

export default function HomeScreen({ navigation }: Props) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Reload profile when returning from edit
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const data = await getUserProfile();
      setProfile(data);
    });
    return unsubscribe;
  }, [navigation]);

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
        <Text style={styles.appName}>meali</Text>
        <Text style={styles.greeting}>{greeting()}</Text>

        {profile ? (
          <>
            <SummaryCard title="Kitchen">
              <Text style={styles.cardValue}>
                {profile.equipment.length > 0
                  ? profile.equipment.join(" · ")
                  : "Nothing selected"}
              </Text>
            </SummaryCard>

            <SummaryCard title="Diet">
              <Text style={styles.cardValue}>
                {profile.diets.length > 0
                  ? profile.diets.join(" · ")
                  : "No restrictions"}
              </Text>
            </SummaryCard>

            <SummaryCard title="Budget & Frequency">
              <Text style={styles.cardValue}>
                {BUDGET_LABELS[profile.budgetLevel] ?? profile.budgetLevel}
                {" · "}
                {profile.weeklyRunFrequency}{" "}
                {profile.weeklyRunFrequency === 1 ? "run" : "runs"} / week
              </Text>
            </SummaryCard>
          </>
        ) : (
          <Text style={styles.empty}>No profile found.</Text>
        )}

        <TouchableOpacity
          style={styles.editBtn}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("Onboarding", {
              initialProfile: profile ?? undefined,
              isEditing: true,
            })
          }
        >
          <Text style={styles.editBtnText}>Edit preferences</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  container: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  appName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0D0D0D",
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: "lowercase",
  },
  greeting: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0D0D0D",
    marginBottom: 32,
  },
  card: {
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B6B6B",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 15,
    color: "#0D0D0D",
    lineHeight: 22,
  },
  empty: {
    fontSize: 15,
    color: "#6B6B6B",
    marginBottom: 24,
  },
  editBtn: {
    marginTop: 24,
    borderWidth: 1.5,
    borderColor: "#0D0D0D",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  editBtnText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0D0D0D",
  },
});
