import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export default function SelectableChip({ label, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 18,
    margin: 5,
    backgroundColor: "#FFFFFF",
  },
  chipSelected: {
    backgroundColor: "#0D0D0D",
    borderColor: "#0D0D0D",
  },
  label: {
    fontSize: 14,
    color: "#0D0D0D",
    fontWeight: "500",
  },
  labelSelected: {
    color: "#FFFFFF",
  },
});
