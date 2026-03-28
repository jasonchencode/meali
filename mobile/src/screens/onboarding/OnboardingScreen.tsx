import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUserProfile, updateUserProfile } from "../../api/userProfile";
import StepIndicator from "../../components/StepIndicator";
import { BudgetLevel } from "../../types/profile";
import { RootStackParamList } from "../../types/navigation";
import BudgetStep from "./steps/BudgetStep";
import DietStep from "./steps/DietStep";
import EquipmentStep from "./steps/EquipmentStep";
import FrequencyStep from "./steps/FrequencyStep";

type Props = NativeStackScreenProps<RootStackParamList, "Onboarding">;

const TOTAL_STEPS = 4;

export default function OnboardingScreen({ navigation, route }: Props) {
  const initialProfile = route.params?.initialProfile;
  const isEditing = route.params?.isEditing ?? false;

  const [step, setStep] = useState(0);
  const [equipment, setEquipment] = useState<string[]>(
    initialProfile?.equipment ?? []
  );
  const [diets, setDiets] = useState<string[]>(initialProfile?.diets ?? []);
  const [budgetLevel, setBudgetLevel] = useState<BudgetLevel | null>(
    initialProfile?.budgetLevel ?? null
  );
  const [weeklyRunFrequency, setWeeklyRunFrequency] = useState(
    initialProfile?.weeklyRunFrequency ?? 2
  );
  const [loading, setLoading] = useState(false);

  function canAdvance(): boolean {
    if (step === 0 && equipment.length === 0) return false;
    if (step === 2 && budgetLevel === null) return false;
    return true;
  }

  async function handleNext() {
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
      return;
    }
    if (!budgetLevel) return;
    setLoading(true);
    try {
      if (isEditing) {
        await updateUserProfile({ equipment, diets, budgetLevel, weeklyRunFrequency });
      } else {
        await createUserProfile({ equipment, diets, budgetLevel, weeklyRunFrequency });
      }
      navigation.replace(isEditing ? "Home" : "Confirmation");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Something went wrong.";
      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  }

  function handleBack() {
    if (step > 0) {
      setStep((s) => s - 1);
    } else if (isEditing) {
      navigation.goBack();
    }
  }

  const showBack = step > 0 || isEditing;
  const isLastStep = step === TOTAL_STEPS - 1;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <StepIndicator total={TOTAL_STEPS} current={step} />
          {showBack && (
            <TouchableOpacity onPress={handleBack} hitSlop={12}>
              <Text style={styles.back}>Back</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.content}>
          {step === 0 && (
            <EquipmentStep selected={equipment} onChange={setEquipment} />
          )}
          {step === 1 && (
            <DietStep selected={diets} onChange={setDiets} />
          )}
          {step === 2 && (
            <BudgetStep selected={budgetLevel} onChange={setBudgetLevel} />
          )}
          {step === 3 && (
            <FrequencyStep value={weeklyRunFrequency} onChange={setWeeklyRunFrequency} />
          )}
        </View>

        <TouchableOpacity
          style={[styles.nextBtn, !canAdvance() && styles.nextBtnDisabled]}
          onPress={handleNext}
          disabled={!canAdvance() || loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.nextBtnText}>
              {isLastStep ? (isEditing ? "Save" : "Finish") : "Continue"}
            </Text>
          )}
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
    paddingTop: 20,
    paddingBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 36,
  },
  back: {
    fontSize: 15,
    color: "#6B6B6B",
    fontWeight: "500",
  },
  content: {
    flex: 1,
  },
  nextBtn: {
    backgroundColor: "#0D0D0D",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 16,
  },
  nextBtnDisabled: {
    backgroundColor: "#E0E0E0",
  },
  nextBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
