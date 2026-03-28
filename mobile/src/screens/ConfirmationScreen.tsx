import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Confirmation">;

export default function ConfirmationScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.emoji}>✓</Text>
        <Text style={styles.title}>You're all set.</Text>
        <Text style={styles.subtitle}>
          Your kitchen profile has been saved. meali will use this to plan meals
          that actually work for you.
        </Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.replace("Home")}
          activeOpacity={0.85}
        >
          <Text style={styles.btnText}>Go to home</Text>
        </TouchableOpacity>
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
    marginBottom: 40,
  },
  btn: {
    backgroundColor: "#0D0D0D",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
