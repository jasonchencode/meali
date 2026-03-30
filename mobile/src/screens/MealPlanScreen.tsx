import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "MealPlan">;

const DAY_LABELS = [
  "Monday", "Tuesday", "Wednesday", "Thursday",
  "Friday", "Saturday", "Sunday",
];

export default function MealPlanScreen({ route, navigation }: Props) {
  const { plan, daysToGenerate } = route.params;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Your meal plan.</Text>
        <Text style={styles.subtitle}>
          {daysToGenerate} {daysToGenerate === 1 ? "day" : "days"} until your next grocery run.
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonOutline]}
            onPress={() => navigation.navigate("GroceryList", { plan })}
          >
            <Text style={styles.actionButtonOutlineText}>Grocery List</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonFill]}
            onPress={() => navigation.navigate("WhereToBuy")}
          >
            <Text style={styles.actionButtonFillText}>Where to Buy</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cards}>
          {plan.map(({ day, meal }) => (
            <View key={day} style={styles.card}>
              <Text style={styles.dayLabel}>{DAY_LABELS[day - 1] ?? `Day ${day}`}</Text>
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.mealDescription}>{meal.description}</Text>
              <Text style={styles.nutrients}>
                ~{meal.calories} cal · {meal.protein}g protein
              </Text>
              <View style={styles.tags}>
                {meal.equipment.map((e) => (
                  <View key={e} style={styles.tag}>
                    <Text style={styles.tagText}>
                      {e.replace(/\b\w/g, (c) => c.toUpperCase())}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },
  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  back: {
    fontSize: 15,
    color: "#6B6B6B",
    fontWeight: "500",
    marginBottom: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0D0D0D",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B6B6B",
    marginBottom: 32,
  },
  cards: {
    gap: 12,
  },
  card: {
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 16,
    padding: 20,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B6B6B",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  mealName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0D0D0D",
    marginBottom: 6,
  },
  mealDescription: {
    fontSize: 14,
    color: "#6B6B6B",
    lineHeight: 20,
    marginBottom: 8,
  },
  nutrients: {
    fontSize: 13,
    fontWeight: "500",
    color: "#81D681",
    marginBottom: 12,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tag: {
    backgroundColor: "#81D681",
    borderRadius: 100,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  tagText: {
    fontSize: 12,
    color: "#2E6417",
    fontWeight: "500",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  actionButtonOutline: {
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
  },
  actionButtonOutlineText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0D0D0D",
  },
  actionButtonFill: {
    backgroundColor: "#81D681",
  },
  actionButtonFillText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
