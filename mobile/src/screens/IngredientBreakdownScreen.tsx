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
import { mealsForDay, slotLabel } from "../utils/mealPlan";

type Props = NativeStackScreenProps<RootStackParamList, "IngredientBreakdown">;

const DAY_LABELS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function IngredientBreakdownScreen({ route, navigation }: Props) {
  const { plan, dismissed } = route.params;
  const dismissedSet = new Set(dismissed.map((d) => d.toLowerCase()));

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Full breakdown.</Text>
        <Text style={styles.subtitle}>
          Every ingredient by meal. Dimmed items are ones you already have.
        </Text>

        <View style={styles.cards}>
          {plan.map((dayPlan) => (
            <View key={dayPlan.day} style={styles.card}>
              <Text style={styles.dayLabel}>
                {DAY_LABELS[dayPlan.day - 1] ?? `Day ${dayPlan.day}`}
              </Text>

              {mealsForDay(dayPlan).map(({ slot, meal }) => (
                <View key={slot} style={styles.mealSection}>
                  <Text style={styles.slotHeading}>{slotLabel(slot)}</Text>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <Text style={styles.nutrients}>
                    ~{meal.calories} cal · {meal.protein}g protein
                  </Text>
                  <View style={styles.ingredientList}>
                    {meal.ingredients.map((ingredient) => {
                      const have = dismissedSet.has(ingredient.toLowerCase());
                      return (
                        <View key={`${slot}-${ingredient}`} style={styles.ingredientRow}>
                          <View style={[styles.dot, have && styles.dotHave]} />
                          <Text
                            style={[
                              styles.ingredientText,
                              have && styles.ingredientTextHave,
                            ]}
                          >
                            {ingredient}
                          </Text>
                          {have && <Text style={styles.haveLabel}>have it</Text>}
                        </View>
                      );
                    })}
                  </View>
                </View>
              ))}
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
    lineHeight: 22,
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
    marginBottom: 12,
  },
  mealSection: {
    marginBottom: 18,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  slotHeading: {
    fontSize: 11,
    fontWeight: "700",
    color: "#9A9A9A",
    textTransform: "uppercase",
    letterSpacing: 0.9,
    marginBottom: 4,
  },
  mealName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0D0D0D",
    marginBottom: 4,
  },
  nutrients: {
    fontSize: 13,
    fontWeight: "500",
    color: "#81D681",
    marginBottom: 12,
  },
  ingredientList: {
    gap: 8,
  },
  ingredientRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#81D681",
    marginRight: 10,
  },
  dotHave: {
    backgroundColor: "#81D681",
  },
  ingredientText: {
    fontSize: 14,
    color: "#0D0D0D",
    flex: 1,
  },
  ingredientTextHave: {
    color: "#B0B0B0",
  },
  haveLabel: {
    fontSize: 12,
    color: "#B0B0B0",
    fontWeight: "500",
  },
});
