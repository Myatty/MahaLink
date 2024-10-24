import { View, Text } from 'react-native'
import React from 'react'

import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* The Stack will automatically pick up the screens from the (auth) folder */}
    </Stack>
  );
};

export default AuthLayout;

