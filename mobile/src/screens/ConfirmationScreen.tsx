import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function ConfirmationScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.emoji}>✓</Text>
        <Text style={styles.title}>You're all set.</Text>
        <Text style={styles.subtitle}>
          Your kitchen profile has been saved. meali will use this to plan meals
          that actually work for you.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  emoji: {
    fontSize: 48,
    marginBottom: 24,
    color: "#0D0D0D",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#0D0D0D",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B6B6B",
    lineHeight: 24,
  },
});
