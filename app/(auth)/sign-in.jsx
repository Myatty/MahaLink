import { View, Text } from 'react-native'
import React from 'react'

const SignIn = () => {
  return (
    <View>
      <Text>SignIn</Text>
    </View>
  )
}

export default SignIn

// import { SafeAreaView, Text, StyleSheet, TextInput, Dimensions, ScrollView, View } from "react-native";
// import React from "react";

// const SignIn = () => {
//   const { height } = Dimensions.get("window");

//   return (
//     <SafeAreaView className="bg-updatedBg h-full">
//       <ScrollView>
//         <View style={styles.brandText} className="absolute top-3">
//           <Text
//             className="text-3xl font-bold text-left"
//             style={{ fontWeight: "900" }}
//           >
//             <Text className="text-[#FEFEFE]">Maha</Text>
//             <Text className="text-[#347928]"> Link</Text>
//           </Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   brandText: {
//     width: "90%",
//   },
//   contentWrapper: {
//     width: "90%",
//     marginTop: height * 0.35, // 35% of the screen height
//   },
//   input: {
//     height: 60,
//     margin: 12,
//     borderWidth: 2,
//     paddingLeft: 20,
//     borderRadius: 20,
//   },
//   customButton: {
//     width: "40%",
//     alignSelf: "center",
//   },
// });

// export default SignIn;
