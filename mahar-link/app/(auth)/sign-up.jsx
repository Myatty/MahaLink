// app/(auth)/Login.jsx
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import React,{ useState } from "react";
import { View, Text, StyleSheet,TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import LoginBtm from "../../components/LoginBtm";
import { Link } from "expo-router";


SplashScreen.preventAutoHideAsync();
const { height } = Dimensions.get("window");

const handleLogin = () => {
  
  console.log('Email:', email);
  console.log('Password:', password);
  
};
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <SafeAreaView className="bg-updatedBg h-full">
      <View className="w-full items-center min-h-[85vh]">
          <View style={styles.brandText} className="absolute top-3">
            <Text className="text-3xl font-bold text-left" style={{ fontWeight: "900" }}>
              <Text className="text-[#FEFEFE]">Maha</Text> 
              <Text className="text-[#347928]"> Link</Text>
            </Text>
          </View>
          <View style={styles.contentWrapper}>
            <Text className="text-3xl text-white font-bold text-center pb-4" style={{ color: "#347928" }}>Register</Text> 
            <TextInput className=""style={styles.input} onChangeText={setEmail} value={email} placeholder="Email" keyboardType="email-address"/>
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/>
            <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry/>
            <View style={styles.btmContainer}>
              <LoginBtm title={"Back"} onPress={handleLogin} containerStyles={styles.customButton} />
              <LoginBtm title={"Continue"} onPress={handleLogin} containerStyles={styles.customButton} />
            </View>
          </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  brandText: {
    width: "90%",
  },
  contentWrapper: {
    width: "90%",
    marginTop: height * 0.35, // 30% of the screen height
  },
  input: {
    height: 60,
    margin: 12,
    borderWidth: 2,
    paddingLeft: 20,
    borderRadius:20
  },
  customButton: {
    width: '40%',        
    alignSelf: 'center',  
  },
  btmContainer:{
    paddingTop:30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
       
  }
});

export default SignUp;

