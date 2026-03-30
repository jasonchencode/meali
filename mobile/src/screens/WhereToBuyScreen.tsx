import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Callout, Marker, Region } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "WhereToBuy">;

const HOME = { latitude: 44.2331, longitude: -76.4917 };

const STORES = [
  {
    id: "metro",
    name: "Metro",
    address: "310 Barrie St",
    latitude: 44.2324,
    longitude: -76.4919,
    walkTime: "2 min walk",
    totalTime: "20–30 min",
    mapsQuery: "Metro+310+Barrie+St+Kingston+ON",
  },
  {
    id: "foodbasics",
    name: "Food Basics",
    address: "1225 Princess St",
    latitude: 44.2473,
    longitude: -76.5236,
    walkTime: "15 min drive",
    totalTime: "40–55 min",
    mapsQuery: "Food+Basics+1225+Princess+St+Kingston+ON",
  },
  {
    id: "costco",
    name: "Costco",
    address: "1015 Centennial Dr",
    latitude: 44.2602,
    longitude: -76.5604,
    walkTime: "20 min drive",
    totalTime: "50–70 min",
    mapsQuery: "Costco+1015+Centennial+Dr+Kingston+ON",
  },
];

const DELIVERY = [
  {
    id: "ubereats",
    name: "Uber Eats",
    time: "35–55 min",
    detail: "Shopper picks up → delivers to door",
    color: "#000000",
    url: "ubereats://",
    fallback: "https://ubereats.com",
  },
  {
    id: "doordash",
    name: "DoorDash",
    time: "30–50 min",
    detail: "Dasher shops and delivers",
    color: "#FF3008",
    url: "doordash://",
    fallback: "https://doordash.com",
  },
  {
    id: "instacart",
    name: "Instacart",
    time: "45–75 min",
    detail: "Personal shopper, same-day delivery",
    color: "#43B02A",
    url: "instacart://",
    fallback: "https://instacart.com",
  },
];

async function openLink(url: string, fallback: string) {
  const canOpen = await Linking.canOpenURL(url);
  Linking.openURL(canOpen ? url : fallback);
}

function openDirections(query: string) {
  Linking.openURL(`https://maps.apple.com/?q=${query}`);
}

export default function WhereToBuyScreen({ navigation }: Props) {
  const [locationReady, setLocationReady] = useState(false);
  const [region, setRegion] = useState<Region>({
    latitude: HOME.latitude,
    longitude: HOME.longitude,
    latitudeDelta: 0.08,
    longitudeDelta: 0.08,
  });
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const loc = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        });
      }
      setLocationReady(true);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Where to buy.</Text>
        <Text style={styles.subtitle}>
          Nearby stores and delivery options for your grocery list.
        </Text>

        {/* Map */}
        <View style={styles.mapContainer}>
          {!locationReady ? (
            <View style={styles.mapPlaceholder}>
              <ActivityIndicator color="#81D681" />
            </View>
          ) : (
            <MapView ref={mapRef} style={styles.map} region={region} showsUserLocation>
              {STORES.map((store) => (
                <Marker
                  key={store.id}
                  coordinate={{ latitude: store.latitude, longitude: store.longitude }}
                  pinColor="#0D0D0D"
                >
                  <Callout>
                    <View style={styles.callout}>
                      <Text style={styles.calloutName}>{store.name}</Text>
                      <Text style={styles.calloutAddress}>{store.address}</Text>
                    </View>
                  </Callout>
                </Marker>
              ))}
            </MapView>
          )}
        </View>

        {/* In-Person */}
        <Text style={styles.sectionLabel}>In-Person</Text>
        <View style={styles.cards}>
          {STORES.map((store) => (
            <View key={store.id} style={styles.card}>
              <View style={styles.cardLeft}>
                <Text style={styles.storeName}>{store.name}</Text>
                <Text style={styles.storeAddress}>{store.address}</Text>
                <Text style={styles.storeTime}>{store.walkTime} · {store.totalTime} total</Text>
              </View>
              <TouchableOpacity
                style={styles.dirButton}
                onPress={() => openDirections(store.mapsQuery)}
              >
                <Text style={styles.dirButtonText}>Directions</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Delivery */}
        <Text style={styles.sectionLabel}>Delivery</Text>
        <View style={styles.cards}>
          {DELIVERY.map((service) => (
            <View key={service.id} style={styles.card}>
              <View style={styles.cardLeft}>
                <View style={styles.serviceRow}>
                  <View style={[styles.dot, { backgroundColor: service.color }]} />
                  <Text style={styles.storeName}>{service.name}</Text>
                </View>
                <Text style={styles.storeAddress}>{service.detail}</Text>
                <Text style={styles.storeTime}>Est. {service.time}</Text>
              </View>
              <TouchableOpacity
                style={styles.dirButton}
                onPress={() => openLink(service.url, service.fallback)}
              >
                <Text style={styles.dirButtonText}>Open</Text>
              </TouchableOpacity>
            </View>
          ))}
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B6B6B",
    lineHeight: 22,
    marginBottom: 24,
  },
  mapContainer: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 32,
    height: 220,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
  },
  map: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  callout: {
    padding: 6,
    minWidth: 120,
  },
  calloutName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0D0D0D",
  },
  calloutAddress: {
    fontSize: 12,
    color: "#6B6B6B",
    marginTop: 2,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B6B6B",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  cards: {
    gap: 10,
    marginBottom: 32,
  },
  card: {
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  cardLeft: {
    flex: 1,
    gap: 3,
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  storeName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0D0D0D",
  },
  storeAddress: {
    fontSize: 13,
    color: "#6B6B6B",
  },
  storeTime: {
    fontSize: 13,
    color: "#6B6B6B",
    fontWeight: "500",
  },
  dirButton: {
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  dirButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0D0D0D",
  },
});
