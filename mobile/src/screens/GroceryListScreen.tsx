import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "GroceryList">;

export default function GroceryListScreen({ route, navigation }: Props) {
  const { plan } = route.params;

  // Aggregate all ingredients across all meals, deduped by lowercase value
  const seen = new Set<string>();
  const allIngredients: string[] = [];
  for (const { meal } of plan) {
    for (const item of meal.ingredients) {
      const key = item.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        allIngredients.push(item);
      }
    }
  }

  const [checked, setChecked] = useState<Set<string>>(new Set());

  function toggleItem(item: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(item)) {
        next.delete(item);
      } else {
        next.add(item);
      }
      return next;
    });
  }

  const remaining = allIngredients.filter((i) => !checked.has(i)).length;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>

        <View style={styles.titleRow}>
          <Text style={styles.title}>Grocery list.</Text>
          {checked.size > 0 && (
            <TouchableOpacity onPress={() => setChecked(new Set())} hitSlop={12}>
              <Text style={styles.clearAll}>Clear all</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.subtitle}>
          {remaining === 0
            ? "All done!"
            : `${remaining} item${remaining === 1 ? "" : "s"} left`}
        </Text>

        <View style={styles.list}>
          {allIngredients.map((item) => {
            const done = checked.has(item);
            return (
              <TouchableOpacity
                key={item}
                style={styles.row}
                onPress={() => toggleItem(item)}
                activeOpacity={0.6}
              >
                <View style={[styles.checkbox, done && styles.checkboxDone]}>
                  {done && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={[styles.itemText, done && styles.itemTextDone]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
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
  },
  subtitle: {
    fontSize: 15,
    color: "#6B6B6B",
    marginBottom: 32,
  },
  list: {
    gap: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#D0D0D0",
    marginRight: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxDone: {
    backgroundColor: "#0D0D0D",
    borderColor: "#0D0D0D",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  itemText: {
    fontSize: 15,
    color: "#0D0D0D",
    flex: 1,
  },
  itemTextDone: {
    color: "#B0B0B0",
    textDecorationLine: "line-through",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  clearAll: {
    fontSize: 14,
    color: "#6B6B6B",
    fontWeight: "500",
  },
});
