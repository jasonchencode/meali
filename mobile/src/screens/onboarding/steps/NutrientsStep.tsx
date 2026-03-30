import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NutrientGoals } from "../../../types/profile";

interface Props {
  value: NutrientGoals;
  onChange: (value: NutrientGoals) => void;
}

export default function NutrientsStep({ value, onChange }: Props) {
  function adjustCalories(delta: number) {
    const next = Math.min(4000, Math.max(1200, value.calories + delta));
    onChange({ ...value, calories: next });
  }

  function adjustProtein(delta: number) {
    const next = Math.min(300, Math.max(50, value.protein + delta));
    onChange({ ...value, protein: next });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nutrition goals</Text>
      <Text style={styles.subtitle}>
        Set daily targets to track how your meal plan stacks up. You can adjust
        these any time in preferences.
      </Text>

      <View style={styles.row}>
        <View style={styles.goalBlock}>
          <Text style={styles.goalLabel}>Calories</Text>
          <Text style={styles.goalUnit}>kcal / day</Text>
          <View style={styles.stepper}>
            <TouchableOpacity
              style={[styles.stepBtn, value.calories <= 1200 && styles.stepBtnDisabled]}
              onPress={() => adjustCalories(-50)}
              activeOpacity={0.7}
            >
              <Text style={styles.stepBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.stepValue}>{value.calories}</Text>
            <TouchableOpacity
              style={[styles.stepBtn, value.calories >= 4000 && styles.stepBtnDisabled]}
              onPress={() => adjustCalories(50)}
              activeOpacity={0.7}
            >
              <Text style={styles.stepBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.goalBlock}>
          <Text style={styles.goalLabel}>Protein</Text>
          <Text style={styles.goalUnit}>g / day</Text>
          <View style={styles.stepper}>
            <TouchableOpacity
              style={[styles.stepBtn, value.protein <= 50 && styles.stepBtnDisabled]}
              onPress={() => adjustProtein(-5)}
              activeOpacity={0.7}
            >
              <Text style={styles.stepBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.stepValue}>{value.protein}</Text>
            <TouchableOpacity
              style={[styles.stepBtn, value.protein >= 300 && styles.stepBtnDisabled]}
              onPress={() => adjustProtein(5)}
              activeOpacity={0.7}
            >
              <Text style={styles.stepBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0D0D0D",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B6B6B",
    lineHeight: 22,
    marginBottom: 48,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  goalBlock: {
    flex: 1,
    alignItems: "center",
  },
  goalLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0D0D0D",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  goalUnit: {
    fontSize: 12,
    color: "#6B6B6B",
    marginBottom: 20,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  stepBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "#0D0D0D",
    alignItems: "center",
    justifyContent: "center",
  },
  stepBtnDisabled: {
    borderColor: "#E0E0E0",
  },
  stepBtnText: {
    fontSize: 20,
    color: "#0D0D0D",
    lineHeight: 24,
  },
  stepValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0D0D0D",
    minWidth: 56,
    textAlign: "center",
  },
  divider: {
    width: 1,
    backgroundColor: "#E0E0E0",
    alignSelf: "stretch",
    marginTop: 40,
  },
});
