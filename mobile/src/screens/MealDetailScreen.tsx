import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { MealResource } from "../api/mealPlan";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "MealDetail">;

function resourceKindLabel(kind: MealResource["kind"]): string {
  switch (kind) {
    case "article":
      return "Article";
    case "video":
      return "Video";
    case "guide":
      return "Guide";
    default:
      return "Link";
  }
}

export default function MealDetailScreen({ route, navigation }: Props) {
  const { meal } = route.params;

  async function openUrl(url: string) {
    const can = await Linking.canOpenURL(url);
    if (can) Linking.openURL(url);
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.back}>Back</Text>
        </Pressable>

        {meal.imageUrl ? (
          <Image
            source={{ uri: meal.imageUrl }}
            style={styles.hero}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.hero, styles.heroPlaceholder]}>
            <Text style={styles.heroPlaceholderEmoji}>🍽</Text>
          </View>
        )}

        <Text style={styles.title}>{meal.name}</Text>
        <Text style={styles.description}>{meal.description}</Text>
        <Text style={styles.meta}>
          ~{meal.calories} cal · {meal.protein}g protein
        </Text>

        <Text style={styles.sectionLabel}>Ingredients</Text>
        <View style={styles.ingredientBlock}>
          {meal.ingredients.map((line) => (
            <Text key={line} style={styles.ingredientLine}>
              • {line}
            </Text>
          ))}
        </View>

        {meal.recipeSteps && meal.recipeSteps.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>Recipe</Text>
            {meal.recipeSteps.map((step, i) => (
              <View key={i} style={styles.stepRow}>
                <View style={styles.stepNumWrap}>
                  <Text style={styles.stepNum}>{i + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </>
        )}

        {meal.resources && meal.resources.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>Resources</Text>
            <Text style={styles.sectionHint}>
              Demo links — recipes, guides, and videos from around the web.
            </Text>
            {meal.resources.map((r) => (
              <Pressable
                key={r.url + r.title}
                style={styles.resourceRow}
                onPress={() => openUrl(r.url)}
              >
                <View style={styles.resourceKind}>
                  <Text style={styles.resourceKindText}>
                    {resourceKindLabel(r.kind)}
                  </Text>
                </View>
                <View style={styles.resourceBody}>
                  <Text style={styles.resourceTitle}>{r.title}</Text>
                  <Text style={styles.resourceUrl} numberOfLines={1}>
                    {r.url}
                  </Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </Pressable>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },
  container: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
  },
  back: {
    fontSize: 15,
    color: "#6B6B6B",
    fontWeight: "500",
    marginBottom: 16,
  },
  hero: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginBottom: 20,
    backgroundColor: "#E8E8E8",
  },
  heroPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  heroPlaceholderEmoji: {
    fontSize: 48,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0D0D0D",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#5E584F",
    lineHeight: 24,
    marginBottom: 10,
  },
  meta: {
    fontSize: 15,
    fontWeight: "600",
    color: "#81D681",
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B6B6B",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  sectionHint: {
    fontSize: 13,
    color: "#9A9A9A",
    lineHeight: 18,
    marginBottom: 12,
  },
  ingredientBlock: {
    marginBottom: 24,
    gap: 8,
  },
  ingredientLine: {
    fontSize: 15,
    color: "#0D0D0D",
    lineHeight: 22,
  },
  stepRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  stepNumWrap: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#E8F6E4",
    alignItems: "center",
    justifyContent: "center",
  },
  stepNum: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2E6417",
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: "#2A2A2A",
    lineHeight: 22,
  },
  resourceRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
    gap: 10,
  },
  resourceKind: {
    backgroundColor: "#F3FBF0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  resourceKindText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2E6417",
  },
  resourceBody: {
    flex: 1,
    minWidth: 0,
  },
  resourceTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0D0D0D",
    marginBottom: 2,
  },
  resourceUrl: {
    fontSize: 12,
    color: "#8A8A8A",
  },
  chevron: {
    fontSize: 22,
    color: "#C0C0C0",
    fontWeight: "300",
  },
});
