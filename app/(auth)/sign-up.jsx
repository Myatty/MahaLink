import { Link, useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Update import from addDoc to setDoc
import React, { useState } from "react";
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { auth, db } from "../../firebaseConfig";

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
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User registered: ", user);

      // Store additional user information in Firestore with UID as document ID
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        name: name,
      });

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
                <Link href="/(auth)/Login" style={styles.backButton}>
                  <Text style={styles.backText}>Back</Text>
                </Link>
                <TouchableOpacity style={styles.customButton} onPress={handleSignUp}>
                  <Text style={styles.linkText}>Continue</Text>
                </TouchableOpacity>
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
    borderRadius: 10,
    borderColor: "#347928",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    margin: 12,
    paddingLeft: 20,
    paddingRight: 10,
    borderColor: "#347928",
  },
  passwordInput: {
    flex: 1,
    height: 60,
  },
  customButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#347928",
    borderRadius: 10,
    margin: 5,
    overflow: "hidden",
  },
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#888",
    borderRadius: 10,
    margin: 5,
    overflow: "hidden",
  },
  btmContainer: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    paddingHorizontal: 10,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  linkText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    width: "100%",
  },
  backText: {
    color: "#eee",
    fontSize: 18,
    textAlign: "center",
    width: "100%",
  },
});

export default SignUp;
