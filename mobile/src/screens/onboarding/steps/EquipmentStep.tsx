import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectableChip from "../../../components/SelectableChip";

const OPTIONS = [
  "Oven",
  "Microwave",
  "Stovetop",
  "Air Fryer",
  "Blender",
  "Instant Pot",
  "Rice Cooker",
  "Toaster",
];

interface Props {
  selected: string[];
  onChange: (value: string[]) => void;
}

export default function EquipmentStep({ selected, onChange }: Props) {
  function toggle(item: string) {
    if (selected.includes(item)) {
      onChange(selected.filter((i) => i !== item));
    } else {
      onChange([...selected, item]);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's in your kitchen?</Text>
      <Text style={styles.subtitle}>Select all the equipment you have access to.</Text>
      <View style={styles.chips}>
        {OPTIONS.map((opt) => (
          <SelectableChip
            key={opt}
            label={opt}
            selected={selected.includes(opt)}
            onPress={() => toggle(opt)}
          />
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
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
