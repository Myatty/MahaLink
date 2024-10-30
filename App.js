// app.js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { auth } from './firebaseConfig'; // Import auth only
import { LogBox } from 'react-native';
export default function App() {
  LogBox.ignoreAllLogs(); 
  return (
    <View style={styles.container}>
      <Text>Hello This is testing!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
