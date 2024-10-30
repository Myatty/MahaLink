import { useRouter } from "expo-router"; // Use the router from expo-router
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const { height } = Dimensions.get("window");

export default function App() {
  const router = useRouter(); // Initialize the router

  return (
    <SafeAreaView className="bg-updatedBg h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>

        {/* welcome view  */}
        <View className="w-full items-center min-h-[85vh]">
          <View style={styles.brandText} className="absolute top-3">
            <Text
              className="text-3xl font-bold text-left"
              style={{ fontWeight: "900" }}
            >
              <Text className="text-[#FEFEFE]">Mahar</Text>
              <Text className="text-[#347928]"> Link</Text>
            </Text>
          </View>

          {/* Wrapper to align Text and Button */}
          <View style={styles.contentWrapper}>
            <Text
              className="text-4xl text-white font-bold text-left"
              style={{ lineHeight: 55, fontWeight: "900" }}
            >
              Seamless <Text style={{ color: "#347928" }}>Communication</Text>
              {"\n"}for rapid{"\n"}Emergency{"\n"}Response
            </Text>
            <CustomButton
              title="Continue"
              handlePress={() => router.push("/(auth)/Login")}
              containerStyles="w-full mt-7 "
            />
          </View>
        </View>

      </ScrollView>

      {/* status bar  */}
      <StatusBar backgroundColor="#181716" style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  brandText: {
    width: "80%",
  },
  contentWrapper: {
    width: "80%",
    marginTop: height * 0.4,

  }
  , contentWrapper: {
    width: "80%",
    marginTop: height * 0.4,

  },
  button: {
    marginTop: 150,
    //backgroundColor: "#3BFB06", communication = #3BFB06
    backgroundColor: "#3BFB06",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 19,
    fontWeight: "bold",

  },
});
