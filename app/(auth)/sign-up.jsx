import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig"; 
import { useRouter } from "expo-router"; 
import Icon from "react-native-vector-icons/Ionicons"; 

const { height } = Dimensions.get("window");

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); 
  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User registered: ", user);
      alert("Registration successful!");
      router.push("../(auth)/Login"); 
    } catch (error) {
      console.error(error);
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={{ flex: 1 }}
    >
      <SafeAreaView className="bg-updatedBg h-full">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View className="w-full items-center min-h-[85vh]">
            <View style={styles.brandText} className="absolute top-3">
              <Text className="text-3xl font-bold text-left" style={{ fontWeight: "900" }}>
                <Text className="text-[#FEFEFE]">Maha</Text>
                <Text className="text-[#347928]"> Link</Text>
              </Text>
            </View>
            <View style={styles.contentWrapper}>
              <Text className="text-3xl text-white font-bold text-center pb-4" style={{ color: "#347928" }}>
                Register
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="Enter your Organization Name"
                placeholderTextColor="#999999"
              />
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Enter Your Email Address"
                keyboardType="email-address"
                placeholderTextColor="#999999"
              />

              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Create a Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!passwordVisible} 
                  placeholderTextColor="#999999"
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                  <Icon name={passwordVisible ? "eye-off" : "eye"} size={20} color="#999999" />
                </TouchableOpacity>
              </View>

              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Re-enter your Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!confirmPasswordVisible} 
                  placeholderTextColor="#999999"
                />
                <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                  <Icon name={confirmPasswordVisible ? "eye-off" : "eye"} size={20} color="#999999" />
                </TouchableOpacity>
              </View>

              <View style={styles.btmContainer}>
                <Link href="/(auth)/Login" style={styles.customButton}>
                  <Text style={styles.linkText}>Back</Text>
                </Link>
                <Link href="/(auth)/Login" style={styles.customButton}>
                  <Text style={styles.linkText} onPress={handleSignUp}>Continue</Text>
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  brandText: {
    width: "90%",
  },
  contentWrapper: {
    width: "90%",
    marginTop: height * 0.25, 
  },
  input: {
    height: 60,
    margin: 12,
    borderWidth: 2,
    paddingLeft: 20,
    borderRadius: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 20,
    margin: 12,
    paddingLeft: 20,
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    height: 60,
  },
  customButton: {
    width: "40%", 
    alignItems: "center", 
    justifyContent: "center", 
    paddingVertical: 10, 
    backgroundColor: "#347928", 
    borderRadius: 10, 
    margin: 5, 
    overflow: "hidden", 
  },
  btmContainer: {
    paddingTop: 30,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  linkText: {
    color: "white",
    fontSize: 18, 
    textAlign: "center", 
    width: "100%", 
  },
});

export default SignUp;
