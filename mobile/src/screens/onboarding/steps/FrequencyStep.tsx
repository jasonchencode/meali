import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export default function FrequencyStep({ value, onChange }: Props) {
  function decrement() {
    if (value > 1) onChange(value - 1);
  }

  function increment() {
    if (value < 7) onChange(value + 1);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How often do you shop?</Text>
      <Text style={styles.subtitle}>
        How many grocery runs do you want to do per week?
      </Text>
      <View style={styles.counter}>
        <TouchableOpacity
          style={[styles.counterBtn, value === 1 && styles.counterBtnDisabled]}
          onPress={decrement}
          activeOpacity={0.7}
        >
          <Text style={styles.counterBtnText}>−</Text>
        </TouchableOpacity>
        <View style={styles.valueWrapper}>
          <Text style={styles.value}>{value}</Text>
          <Text style={styles.valueLabel}>{value === 1 ? "run" : "runs"} / week</Text>
        </View>
        <TouchableOpacity
          style={[styles.counterBtn, value === 7 && styles.counterBtnDisabled]}
          onPress={increment}
          activeOpacity={0.7}
        >
          <Text style={styles.counterBtnText}>+</Text>
        </TouchableOpacity>
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
    marginBottom: 48,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 28,
  },
  counterBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: "#0D0D0D",
    alignItems: "center",
    justifyContent: "center",
  },
  counterBtnDisabled: {
    borderColor: "#E0E0E0",
  },
  counterBtnText: {
    fontSize: 22,
    color: "#0D0D0D",
    lineHeight: 26,
  },
  valueWrapper: {
    alignItems: "center",
    minWidth: 80,
  },
  value: {
    fontSize: 52,
    fontWeight: "700",
    color: "#0D0D0D",
    lineHeight: 60,
  },
  valueLabel: {
    fontSize: 14,
    color: "#6B6B6B",
    marginTop: 4,
  },
});
