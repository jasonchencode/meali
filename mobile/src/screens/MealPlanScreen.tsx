import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../types/navigation";
import {
  dayTotals,
  mealsForDay,
  slotLabel,
} from "../utils/mealPlan";

type Props = NativeStackScreenProps<RootStackParamList, "MealPlan">;

const DAY_LABELS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function MealPlanScreen({ route, navigation }: Props) {
  const { plan, daysToGenerate } = route.params;
  const [dayIndex, setDayIndex] = useState(0);

  const activeDay = plan[dayIndex];
  const totals = useMemo(
    () => (activeDay ? dayTotals(activeDay) : { calories: 0, protein: 0 }),
    [activeDay]
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.back}>Back</Text>
        </Pressable>

        <Text style={styles.title}>Your meal plan.</Text>
        <Text style={styles.subtitle}>
          {daysToGenerate} {daysToGenerate === 1 ? "day" : "days"} until your
          next grocery run. Each day has breakfast, lunch, and dinner.
        </Text>

        <View style={styles.buttonRow}>
          <Pressable
            style={[styles.actionButton, styles.actionButtonOutline]}
            onPress={() => navigation.navigate("GroceryList", { plan })}
          >
            <Text style={styles.actionButtonOutlineText}>Grocery List</Text>
          </Pressable>
          <Pressable
            style={[styles.actionButton, styles.actionButtonFill]}
            onPress={() => navigation.navigate("WhereToBuy")}
          >
            <Text style={styles.actionButtonFillText}>Where to Buy</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionEyebrow}>Jump to day</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dayChips}
        >
          {plan.map((d, i) => {
            const selected = i === dayIndex;
            const label = DAY_LABELS[d.day - 1] ?? `Day ${d.day}`;
            return (
              <Pressable
                key={d.day}
                onPress={() => setDayIndex(i)}
                style={[styles.dayChip, selected && styles.dayChipSelected]}
              >
                <Text
                  style={[styles.dayChipText, selected && styles.dayChipTextSelected]}
                >
                  {label.slice(0, 3)}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {activeDay && (
          <View style={styles.dayPanel}>
            <View style={styles.dayHeaderRow}>
              <Text style={styles.dayTitle}>
                {DAY_LABELS[activeDay.day - 1] ?? `Day ${activeDay.day}`}
              </Text>
              <Text style={styles.dayTotals}>
                ~{totals.calories} cal · {totals.protein}g protein
              </Text>
            </View>
            <Text style={styles.dayTotalsHint}>Estimated total for the day</Text>

            <View style={styles.mealList}>
              {mealsForDay(activeDay).map(({ slot, meal }) => (
                <View key={slot}>
                  <Text style={styles.slotLabel}>{slotLabel(slot)}</Text>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <Text style={styles.mealDescription} numberOfLines={2}>
                    {meal.description}
                  </Text>
                  <Text style={styles.nutrients}>
                    ~{meal.calories} cal · {meal.protein}g protein
                  </Text>
                  <View style={styles.tags}>
                    {meal.equipment.slice(0, 4).map((e) => (
                      <View key={e} style={styles.tag}>
                        <Text style={styles.tagText}>
                          {e.replace(/\b\w/g, (c) => c.toUpperCase())}
                        </Text>
                      </View>
                    ))}
                    {meal.equipment.length > 4 && (
                      <Text style={styles.moreTags}>+{meal.equipment.length - 4}</Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
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
    marginBottom: 20,
    lineHeight: 22,
  },
  sectionEyebrow: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B6B6B",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  dayChips: {
    gap: 8,
    paddingBottom: 20,
    flexGrow: 0,
  },
  dayChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
  },
  dayChipSelected: {
    borderColor: "#81D681",
    backgroundColor: "#F3FBF0",
  },
  dayChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B6B6B",
  },
  dayChipTextSelected: {
    color: "#2E6417",
  },
  dayPanel: {
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 16,
    padding: 18,
    backgroundColor: "#FAFAFA",
  },
  dayHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 12,
    flexWrap: "wrap",
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0D0D0D",
  },
  dayTotals: {
    fontSize: 14,
    fontWeight: "600",
    color: "#81D681",
  },
  dayTotalsHint: {
    fontSize: 12,
    color: "#9A9A9A",
    marginTop: 4,
    marginBottom: 16,
  },
  mealList: {
    gap: 18,
  },
  slotLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6B6B6B",
    textTransform: "uppercase",
    letterSpacing: 0.9,
    marginBottom: 6,
  },
  mealName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0D0D0D",
    marginBottom: 4,
  },
  mealDescription: {
    fontSize: 14,
    color: "#6B6B6B",
    lineHeight: 20,
    marginBottom: 6,
  },
  nutrients: {
    fontSize: 13,
    fontWeight: "500",
    color: "#81D681",
    marginBottom: 10,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    alignItems: "center",
  },
  tag: {
    backgroundColor: "#81D681",
    borderRadius: 100,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  tagText: {
    fontSize: 11,
    color: "#2E6417",
    fontWeight: "500",
  },
  moreTags: {
    fontSize: 12,
    color: "#6B6B6B",
    fontWeight: "500",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 22,
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
