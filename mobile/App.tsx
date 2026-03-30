import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ConfirmationScreen from "./src/screens/ConfirmationScreen";
import GroceryListScreen from "./src/screens/GroceryListScreen";
import IngredientBreakdownScreen from "./src/screens/IngredientBreakdownScreen";
import WhereToBuyScreen from "./src/screens/WhereToBuyScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import MealDetailScreen from "./src/screens/MealDetailScreen";
import MealPlanScreen from "./src/screens/MealPlanScreen";
import OnboardingScreen from "./src/screens/onboarding/OnboardingScreen";
import { MealPlanProvider } from "./src/context/MealPlanContext";
import { RootStackParamList } from "./src/types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaProvider>
      <MealPlanProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
          <Stack.Screen name="MealPlan" component={MealPlanScreen} />
          <Stack.Screen name="MealDetail" component={MealDetailScreen} />
          <Stack.Screen name="GroceryList" component={GroceryListScreen} />
          <Stack.Screen name="IngredientBreakdown" component={IngredientBreakdownScreen} />
          <Stack.Screen name="WhereToBuy" component={WhereToBuyScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      </MealPlanProvider>
    </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
