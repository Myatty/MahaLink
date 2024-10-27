import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Button,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Circle, Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { StatusBar } from "expo-status-bar";

const Map = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [radius, setRadius] = useState(150);
  const [marker, setMarker] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [pinningMode, setPinningMode] = useState(false);
  const [pinData, setPinData] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPinLocation, setNewPinLocation] = useState(null);
  const mapRef = useRef(null);
  const [floodRisk, setFloodRisk] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  const centerMap = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        1250
      );
    }
  };

  const handleRegionChange = (region) => {
    const newRadius = Math.max(50, Math.round(1000 * region.latitudeDelta));
    setRadius(newRadius);
  };

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    if (pinningMode) {
      setNewPinLocation({ latitude, longitude });
      setModalVisible(true);
    } else {
      setMarker({ latitude, longitude });
      await fetchWeatherData(latitude, longitude);
    }
  };

  const selectDonationType = async (type) => {
    const newPin = { ...newPinLocation, type };
    setPinData([...pinData, newPin]);

    await fetchWeatherData(newPin.latitude, newPin.longitude, newPin);

    setModalVisible(false);
    setPinningMode(false);
  };

  const analyzeFloodRisk = (weatherData) => {
    let highRainfallCount = 0;

    // Analyze the first 5 forecast periods (15 hours ahead)
    weatherData.list.slice(0, 5).forEach((forecast) => {
      const {
        pop,
        main: { humidity },
      } = forecast;

      if (pop > 0.6 && humidity > 80) {
        highRainfallCount++;
      }
    });

    // If there are 3 or more high-risk periods, flood risk is high
    return highRainfallCount >= 3;
  };

  const fetchWeatherData = async (lat, lon, retries = 3) => {
    try {
      const apiKey = "9fa7908f1082d055d948753d170644a0";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
        { timeout: 10000 }
      );
      const data = response.data;
      setWeatherData(data);
      const floodRiskDetected = analyzeFloodRisk(data);
      setFloodRisk(floodRiskDetected);
      if (floodRiskDetected) {
        alert("Flood risk detected! Please stay alert.");
      }
    } catch (error) {
      if (retries > 0) {
        console.warn(`Retrying... (${3 - retries} retries left)`);
        await fetchWeatherData(lat, lon, retries - 1);
      } else {
        console.error("Error fetching weather data:", error);
      }
    }
  };

  const handlePinPress = (pin) => {
    setSelectedPin(pin);
  };

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {location && (
        <>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onRegionChangeComplete={handleRegionChange}
            onPress={handleMapPress}
          >
            <Circle
              center={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              radius={radius + 10}
              fillColor="rgba(255, 255, 255, 0.3)"
              strokeColor="rgba(255, 255, 255, 0.5)"
              strokeWidth={4}
            />

            <Circle
              center={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              radius={radius}
              fillColor="rgba(135, 206, 235, 0.5)"
              strokeColor="rgba(0, 0, 255, 0.7)"
              strokeWidth={3}
            />

            {marker && (
              <Marker coordinate={marker}>
                <Callout>
                  <View style={styles.callout}>
                    <Text style={styles.calloutTitle}>Weather Data</Text>
                    {weatherData &&
                    weatherData.list &&
                    weatherData.list.length > 0 ? (
                      <View style={styles.weatherContainer}>
                        {weatherData.list[0].main && (
                          <Text style={styles.weatherText}>
                            Temperature: {weatherData.list[0].main.temp} °C
                          </Text>
                        )}
                        {weatherData.list[0].weather &&
                          weatherData.list[0].weather[0] && (
                            <Text style={styles.weatherText}>
                              Weather:{" "}
                              {weatherData.list[0].weather[0].description}
                            </Text>
                          )}
                        {weatherData.city && (
                          <Text style={styles.weatherText}>
                            Township: {weatherData.city.name}
                          </Text>
                        )}

                        <Text style={styles.weatherText}>
                          Flood Risk Level: {floodRisk ? "High" : "Low"}
                        </Text>
                        <Text style={styles.weatherText}>
                          Current Humidity: {weatherData.list[0].main.humidity}%
                        </Text>
                      </View>
                    ) : (
                      <Text style={styles.weatherText}>
                        No weather data available at the moment! Please Retry.
                      </Text>
                    )}
                  </View>
                </Callout>
              </Marker>
            )}

            {pinData.map((pin, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: pin.latitude,
                  longitude: pin.longitude,
                }}
                title={pin.type}
                pinColor={
                  pin.type === "Going to donate food"
                    ? "orange"
                    : pin.type === "Going to donate medicine"
                    ? "green"
                    : "blue"
                } // Change pin color based on type
                onPress={() => handlePinPress(pin)}
              ></Marker>
            ))}
          </MapView>

          {/* Button for Normal Marker Mode */}
          <TouchableOpacity
            style={[styles.button, styles.normalButton]}
            onPress={() => {
              setPinningMode(false);
              setMarker(null);
            }}
          >
            <Text style={styles.buttonText}>Normal Marker Mode</Text>
          </TouchableOpacity>

          {/* Button for Donation Pinning Mode */}
          <TouchableOpacity
            style={[styles.button, styles.donationButton]}
            onPress={() => {
              setPinningMode(true);
              setMarker(null);
            }}
          >
            <Text style={styles.buttonText}>Enable Donation Pinning Mode</Text>
          </TouchableOpacity>

          {/* Button to Center Map */}
          <TouchableOpacity style={styles.button} onPress={centerMap}>
            <Image
              source={require("../../assets/images/location.png")}
              style={styles.buttonImage}
            />
          </TouchableOpacity>

          {/* Modal for selecting donation type */}
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
          >
        
<View style={styles.modalContainer}>
  <View style={styles.modalContent}>
    <Text style={styles.modalTitle}>Select Donation Type</Text>
    <View style={styles.buttonSpacing}>
      <Button
        title="Going to donate food"
        onPress={() => selectDonationType("Going to donate food")}
      />
    </View>
    <View style={styles.buttonSpacing}>
      <Button
        title="Going to donate medicine"
        onPress={() => selectDonationType("Going to donate medicine")}
      />
    </View>
    <View style={styles.buttonSpacing}>
      <Button
        title="Going to donate clothes"
        onPress={() => selectDonationType("Going to donate clothes")}
      />
    </View>
    <TouchableOpacity onPress={() => setModalVisible(false)}>
      <Text style={styles.cancelText}>Cancel</Text>
    </TouchableOpacity>
  </View>
</View>
          </Modal>
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  callout: {
    width: 200,  // Increase the width to better fit the text
  },
  calloutTitle: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: 'center',
  },
  
  weatherContainer: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    width: "100%", // Ensure the container fills the updated width of the callout
  },
  weatherText: {
    fontSize: 16,
    marginBottom: 5,
    
  },
  button: {
    position: "absolute",
    bottom: 60,
    left: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    elevation: 3,
  },
  normalButton: {
    bottom: 120,
  },
  donationButton: {
    bottom: 80,
  },
  buttonImage: {
    width: 25,
    height: 25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  buttonSpacing: {
    marginBottom: 10, // Spacing between buttons
  },
  titleSpacing: {
    marginBottom: 20, // Space between title and first button
  },
  cancelText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10, // Adjust to add space above the cancel text
  },
});

export default Map;
