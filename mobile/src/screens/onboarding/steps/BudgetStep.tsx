import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import { BudgetLevel } from "../../../types/profile";

const OPTIONS: { value: BudgetLevel; label: string; description: string }[] = [
  { value: "low", label: "Budget", description: "Under $50 / week" },
  { value: "medium", label: "Moderate", description: "$50 – $100 / week" },
  { value: "high", label: "Flexible", description: "Over $100 / week" },
];

const LEVEL_INDEX: BudgetLevel[] = ["low", "medium", "high"];

interface Props {
  selected: BudgetLevel | null;
  onChange: (value: BudgetLevel) => void;
}

export default function BudgetStep({ selected, onChange }: Props) {
  const selectedIndex = LEVEL_INDEX.indexOf(selected ?? "medium");
  const currentOption = OPTIONS[selectedIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's your weekly budget?</Text>
      <Text style={styles.subtitle}>
        Slide to set the budget range that feels right for your week.
      </Text>

      <View style={styles.sliderCard}>
        <View style={styles.valueRow}>
          <Text style={styles.valueLabel}>{currentOption.label}</Text>
          <Text style={styles.valueDescription}>{currentOption.description}</Text>
        </View>

        <Slider
          value={selectedIndex}
          minimumValue={0}
          maximumValue={2}
          step={1}
          minimumTrackTintColor="#0D0D0D"
          maximumTrackTintColor="#D9D9D9"
          thumbTintColor="#0D0D0D"
          onValueChange={(value) => onChange(LEVEL_INDEX[Math.round(value)])}
        />

        <View style={styles.scaleRow}>
          {OPTIONS.map((option, index) => (
            <View key={option.value} style={styles.scaleItem}>
              <View
                style={[
                  styles.scaleDot,
                  index <= selectedIndex && styles.scaleDotActive,
                ]}
              />
              <Text
                style={[
                  styles.scaleLabel,
                  index === selectedIndex && styles.scaleLabelActive,
                ]}
              >
                {option.label}
              </Text>
            </View>
          ))}
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
    marginBottom: 28,
  },
  sliderCard: {
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: "#FFFFFF",
  },
  valueRow: {
    marginBottom: 18,
  },
  valueLabel: {
    fontSize: 24,
    fontWeight: "600",
    color: "#0D0D0D",
  },
  valueDescription: {
    fontSize: 14,
    color: "#6B6B6B",
    marginTop: 6,
  },
  scaleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  scaleItem: {
    alignItems: "center",
    flex: 1,
  },
  scaleDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#D9D9D9",
    marginBottom: 10,
  },
  scaleDotActive: {
    backgroundColor: "#0D0D0D",
  },
  scaleLabel: {
    fontSize: 12,
    color: "#8A8A8A",
    fontWeight: "500",
  },
  scaleLabelActive: {
    color: "#0D0D0D",
  },
});
