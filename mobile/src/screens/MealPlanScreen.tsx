import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { swapMeal } from "../api/mealPlan";
import { getUserProfile } from "../api/userProfile";
import { useMealPlan } from "../context/MealPlanContext";
import type { Meal } from "../api/mealPlan";
import { UserProfile } from "../types/profile";
import { RootStackParamList } from "../types/navigation";
import {
  dayTotals,
  mealForSlot,
  mealsForDay,
  otherMealIds,
  slotLabel,
  type MealSlot,
} from "../utils/mealPlan";

type Props = NativeStackScreenProps<RootStackParamList, "MealPlan">;

const DAY_LABELS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function MealPlanScreen({ navigation }: Props) {
  const { plan, daysToGenerate, replaceMeal } = useMealPlan();
  const [dayIndex, setDayIndex] = useState(0);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [swapTarget, setSwapTarget] = useState<{
    dayIndex: number;
    slot: MealSlot;
  } | null>(null);
  const [proposal, setProposal] = useState<Meal | null>(null);
  const [swapLoading, setSwapLoading] = useState(false);

  const planRef = useRef(plan);
  planRef.current = plan;

  useEffect(() => {
    getUserProfile().then(setProfile);
  }, []);

  const activeDay = plan && plan[dayIndex] ? plan[dayIndex] : null;
  const totals = useMemo(
    () => (activeDay ? dayTotals(activeDay) : { calories: 0, protein: 0 }),
    [activeDay]
  );

  const fetchSwapProposal = useCallback(async () => {
    if (!swapTarget || !profile) return;
    const currentPlan = planRef.current;
    if (!currentPlan) return;
    setSwapLoading(true);
    try {
      const day = currentPlan[swapTarget.dayIndex];
      const current = mealForSlot(day, swapTarget.slot);
      const sameDay = otherMealIds(day, swapTarget.slot);
      const meal = await swapMeal({
        profile,
        currentMealId: current.id,
        sameDayMealIds: sameDay,
      });
      setProposal(meal);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Try again.";
      Alert.alert("Could not swap", msg);
      setProposal(null);
    } finally {
      setSwapLoading(false);
    }
  }, [swapTarget, profile]);

  useEffect(() => {
    if (!swapTarget) return;
    setProposal(null);
    fetchSwapProposal();
  }, [swapTarget, fetchSwapProposal]);

  function openSwap(dayIdx: number, slot: MealSlot) {
    setSwapTarget({ dayIndex: dayIdx, slot });
  }

  function closeSwap() {
    setSwapTarget(null);
    setProposal(null);
  }

  function confirmSwap() {
    if (!swapTarget || !proposal) return;
    replaceMeal(swapTarget.dayIndex, swapTarget.slot, proposal);
    closeSwap();
  }

  function tryAnother() {
    setProposal(null);
    fetchSwapProposal();
  }

  if (!plan?.length) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyTitle}>No meal plan yet</Text>
          <Text style={styles.emptySubtitle}>
            Generate a plan from home to see it here.
          </Text>
          <Pressable style={styles.emptyBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.emptyBtnText}>Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.back}>Back</Text>
        </Pressable>

        <Text style={styles.title}>Your meal plan.</Text>
        <Text style={styles.subtitle}>
          {daysToGenerate} {daysToGenerate === 1 ? "day" : "days"} until your
          next grocery run. Each day has breakfast, lunch, and dinner.
        </Text>

        <View style={styles.buttonRow}>
          <Pressable
            style={[styles.actionButton, styles.actionButtonOutline]}
            onPress={() => navigation.navigate("GroceryList")}
          >
            <Text style={styles.actionButtonOutlineText}>Grocery List</Text>
          </Pressable>
          <Pressable
            style={[styles.actionButton, styles.actionButtonFill]}
            onPress={() => navigation.navigate("WhereToBuy")}
          >
            <Text style={styles.actionButtonFillText}>Where to Buy</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionEyebrow}>Jump to day</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dayChips}
        >
          {plan.map((d, i) => {
            const selected = i === dayIndex;
            const label = DAY_LABELS[d.day - 1] ?? `Day ${d.day}`;
            return (
              <Pressable
                key={d.day}
                onPress={() => setDayIndex(i)}
                style={[styles.dayChip, selected && styles.dayChipSelected]}
              >
                <Text
                  style={[styles.dayChipText, selected && styles.dayChipTextSelected]}
                >
                  {label.slice(0, 3)}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {activeDay && (
          <View style={styles.dayPanel}>
            <View style={styles.dayHeaderRow}>
              <Text style={styles.dayTitle}>
                {DAY_LABELS[activeDay.day - 1] ?? `Day ${activeDay.day}`}
              </Text>
              <Text style={styles.dayTotals}>
                ~{totals.calories} cal · {totals.protein}g protein
              </Text>
            </View>
            <Text style={styles.dayTotalsHint}>Estimated total for the day</Text>

            <View style={styles.mealList}>
              {mealsForDay(activeDay).map(({ slot, meal }) => (
                <View key={slot}>
                  <Text style={styles.slotLabel}>{slotLabel(slot)}</Text>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <Text style={styles.mealDescription} numberOfLines={2}>
                    {meal.description}
                  </Text>
                  <Text style={styles.nutrients}>
                    ~{meal.calories} cal · {meal.protein}g protein
                  </Text>
                  <View style={styles.tags}>
                    {meal.equipment.slice(0, 4).map((e) => (
                      <View key={e} style={styles.tag}>
                        <Text style={styles.tagText}>
                          {e.replace(/\b\w/g, (c) => c.toUpperCase())}
                        </Text>
                      </View>
                    ))}
                    {meal.equipment.length > 4 && (
                      <Text style={styles.moreTags}>+{meal.equipment.length - 4}</Text>
                    )}
                  </View>
                  <Pressable
                    style={[styles.swapBtn, !profile && styles.swapBtnDisabled]}
                    onPress={() => openSwap(dayIndex, slot)}
                    disabled={!profile}
                  >
                    <Text style={styles.swapBtnText}>Swap meal</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={swapTarget !== null}
        animationType="fade"
        transparent
        onRequestClose={closeSwap}
      >
        <Pressable style={styles.modalOverlay} onPress={closeSwap}>
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>
              Swap {swapTarget ? slotLabel(swapTarget.slot) : ""}
            </Text>
            <Text style={styles.modalHint}>
              Same rules as your plan — equipment, diet, and budget.
            </Text>

            {swapLoading && (
              <View style={styles.modalLoading}>
                <ActivityIndicator color="#81D681" />
                <Text style={styles.modalLoadingText}>Finding an alternative…</Text>
              </View>
            )}

            {!swapLoading && proposal && (
              <>
                <Text style={styles.proposalName}>{proposal.name}</Text>
                <Text style={styles.proposalDesc}>{proposal.description}</Text>
                <Text style={styles.proposalMeta}>
                  ~{proposal.calories} cal · {proposal.protein}g protein
                </Text>
              </>
            )}

            <View style={styles.modalActions}>
              <Pressable style={styles.modalSecondary} onPress={closeSwap}>
                <Text style={styles.modalSecondaryText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalSecondary, swapLoading && styles.modalBtnDisabled]}
                onPress={tryAnother}
                disabled={swapLoading}
              >
                <Text style={styles.modalSecondaryText}>Try another</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.modalPrimary,
                  (!proposal || swapLoading) && styles.modalBtnDisabled,
                ]}
                onPress={confirmSwap}
                disabled={!proposal || swapLoading}
              >
                <Text style={styles.modalPrimaryText}>Use this</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
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
  emptyWrap: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    paddingBottom: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0D0D0D",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: "#6B6B6B",
    lineHeight: 22,
    marginBottom: 20,
  },
  emptyBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#81D681",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  emptyBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
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
    marginBottom: 20,
    lineHeight: 22,
  },
  sectionEyebrow: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B6B6B",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  dayChips: {
    gap: 8,
    paddingBottom: 20,
    flexGrow: 0,
  },
  dayChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
  },
  dayChipSelected: {
    borderColor: "#81D681",
    backgroundColor: "#F3FBF0",
  },
  dayChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B6B6B",
  },
  dayChipTextSelected: {
    color: "#2E6417",
  },
  dayPanel: {
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 16,
    padding: 18,
    backgroundColor: "#FAFAFA",
  },
  dayHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 12,
    flexWrap: "wrap",
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0D0D0D",
  },
  dayTotals: {
    fontSize: 14,
    fontWeight: "600",
    color: "#81D681",
  },
  dayTotalsHint: {
    fontSize: 12,
    color: "#9A9A9A",
    marginTop: 4,
    marginBottom: 16,
  },
  mealList: {
    gap: 18,
  },
  slotLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6B6B6B",
    textTransform: "uppercase",
    letterSpacing: 0.9,
    marginBottom: 6,
  },
  mealName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0D0D0D",
    marginBottom: 4,
  },
  mealDescription: {
    fontSize: 14,
    color: "#6B6B6B",
    lineHeight: 20,
    marginBottom: 6,
  },
  nutrients: {
    fontSize: 13,
    fontWeight: "500",
    color: "#81D681",
    marginBottom: 10,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    alignItems: "center",
    marginBottom: 8,
  },
  tag: {
    backgroundColor: "#81D681",
    borderRadius: 100,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  tagText: {
    fontSize: 11,
    color: "#2E6417",
    fontWeight: "500",
  },
  moreTags: {
    fontSize: 12,
    color: "#6B6B6B",
    fontWeight: "500",
  },
  swapBtn: {
    alignSelf: "flex-start",
    marginTop: 4,
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  swapBtnDisabled: {
    opacity: 0.45,
  },
  swapBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2E6417",
    textDecorationLine: "underline",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 22,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  actionButtonOutline: {
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
  },
  actionButtonOutlineText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0D0D0D",
  },
  actionButtonFill: {
    backgroundColor: "#81D681",
  },
  actionButtonFillText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 22,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0D0D0D",
    marginBottom: 6,
  },
  modalHint: {
    fontSize: 13,
    color: "#6B6B6B",
    lineHeight: 18,
    marginBottom: 16,
  },
  modalLoading: {
    alignItems: "center",
    paddingVertical: 24,
    gap: 10,
  },
  modalLoadingText: {
    fontSize: 14,
    color: "#6B6B6B",
  },
  proposalName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0D0D0D",
    marginBottom: 6,
  },
  proposalDesc: {
    fontSize: 14,
    color: "#6B6B6B",
    lineHeight: 20,
    marginBottom: 8,
  },
  proposalMeta: {
    fontSize: 14,
    fontWeight: "600",
    color: "#81D681",
  },
  modalActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 20,
    justifyContent: "flex-end",
  },
  modalSecondary: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  modalSecondaryText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6B6B6B",
  },
  modalPrimary: {
    backgroundColor: "#81D681",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  modalPrimaryText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  modalBtnDisabled: {
    opacity: 0.45,
  },
});
