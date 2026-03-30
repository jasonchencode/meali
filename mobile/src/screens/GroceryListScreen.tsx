import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
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
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const swipeableRefs = useRef<Map<string, Swipeable | null>>(new Map());

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

  function dismissItem(item: string) {
    setDismissed((prev) => new Set(prev).add(item));
  }

  const activeItems = allIngredients.filter((i) => !dismissed.has(i));
  const remaining = activeItems.filter((i) => !checked.has(i)).length;

  function renderLeftAction(progress: Animated.AnimatedInterpolation<number>) {
    const translateX = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [-80, 0],
    });
    return (
      <Animated.View style={[styles.swipeAction, { transform: [{ translateX }] }]}>
        <Text style={styles.swipeActionText}>Have it</Text>
      </Animated.View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Grocery list.</Text>
        <Text style={styles.subtitle}>
          {remaining === 0
            ? "All done!"
            : `${remaining} item${remaining === 1 ? "" : "s"} left`}
        </Text>

        <View style={styles.list}>
          {activeItems.map((item) => {
            const done = checked.has(item);
            return (
              <Swipeable
                key={item}
                ref={(ref: Swipeable | null) => {
                  swipeableRefs.current.set(item, ref);
                }}
                renderLeftActions={renderLeftAction}
                onSwipeableOpen={(direction: string) => {
                  if (direction === "left") {
                    swipeableRefs.current.get(item)?.close();
                    dismissItem(item);
                  }
                }}
                leftThreshold={60}
                friction={2}
              >
                <TouchableOpacity
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
              </Swipeable>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.breakdownButton}
          onPress={() =>
            navigation.navigate("IngredientBreakdown", {
              plan,
              dismissed: Array.from(dismissed),
            })
          }
        >
          <Text style={styles.breakdownButtonText}>View full breakdown</Text>
        </TouchableOpacity>
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B6B6B",
    marginBottom: 32,
  },
  list: {
    gap: 4,
    marginBottom: 32,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    backgroundColor: "#FFFFFF",
  },
  swipeAction: {
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  swipeActionText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B6B6B",
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
  breakdownButton: {
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    alignItems: "center",
  },
  breakdownButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0D0D0D",
  },
});
