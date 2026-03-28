import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { getUserProfile } from "../api/userProfile";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Loading">;

export default function LoadingScreen({ navigation }: Props) {
  useEffect(() => {
    async function checkProfile() {
      try {
        const profile = await getUserProfile();
        if (profile) {
          navigation.replace("Home");
        } else {
          navigation.replace("Onboarding");
        }
      } catch {
        // On network error fall through to onboarding
        navigation.replace("Onboarding");
      }
    }
    checkProfile();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color="#0D0D0D" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
