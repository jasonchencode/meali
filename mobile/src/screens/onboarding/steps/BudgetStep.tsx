import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BudgetLevel } from "../../../types/profile";

const OPTIONS: { value: BudgetLevel; label: string; description: string }[] = [
  { value: "low", label: "Budget", description: "Under $50 / week" },
  { value: "medium", label: "Moderate", description: "$50 – $100 / week" },
  { value: "high", label: "Flexible", description: "Over $100 / week" },
];

interface Props {
  selected: BudgetLevel | null;
  onChange: (value: BudgetLevel) => void;
}

export default function BudgetStep({ selected, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's your weekly budget?</Text>
      <Text style={styles.subtitle}>This helps us suggest realistic meal plans.</Text>
      <View style={styles.cards}>
        {OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt.value}
            style={[styles.card, selected === opt.value && styles.cardSelected]}
            onPress={() => onChange(opt.value)}
            activeOpacity={0.7}
          >
            <Text style={[styles.cardLabel, selected === opt.value && styles.cardLabelSelected]}>
              {opt.label}
            </Text>
            <Text style={[styles.cardDesc, selected === opt.value && styles.cardDescSelected]}>
              {opt.description}
            </Text>
          </TouchableOpacity>
        ))}
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
    marginBottom: 24,
  },
  cards: {
    gap: 12,
  },
  card: {
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 16,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  cardSelected: {
    borderColor: "#0D0D0D",
    backgroundColor: "#0D0D0D",
  },
  cardLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#0D0D0D",
    marginBottom: 4,
  },
  cardLabelSelected: {
    color: "#FFFFFF",
  },
  cardDesc: {
    fontSize: 13,
    color: "#6B6B6B",
  },
  cardDescSelected: {
    color: "#A0A0A0",
  },
});
