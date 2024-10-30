import { View, Text } from 'react-native'
import React from 'react'
import ProfileScreen from '../screens/UserScreen/ProfileScreen'

export default function profile() {
  return (
    <View style={{ padding: 5, }}>
      <ProfileScreen />
    </View>
  )
}