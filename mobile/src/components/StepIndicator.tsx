import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  total: number;
  current: number;
}

export default function StepIndicator({ total, current }: Props) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[styles.dot, i === current && styles.dotActive]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E0E0E0",
  },
  dotActive: {
    width: 20,
    backgroundColor: "#0D0D0D",
  },
});
