import { View, Text } from 'react-native'
import React from 'react'

import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* The Stack will automatically pick up the screens from the (auth) folder */}
    </Stack>
  //   <>
  //   <Stack>
  //     <Stack.screen name="sign-in" options={{ headerShown: false }} />
  //     <Stack.screen name="sign-up" options={{ headerShown: false }} />
  //   </Stack>

  //   <StatusBar backgroundColor="#3BFB06" style="light" /> 
  // </>
  );
};

export default AuthLayout;

