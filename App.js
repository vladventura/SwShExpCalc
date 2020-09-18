import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import {InfoInput} from './components/InfoInput';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Candy Calc</Text>
      <Text>A calculator for Exp. Candy optimization in Pokemon Sword & Shield. Read the FAQ for more information.</Text>
      <InfoInput />
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
