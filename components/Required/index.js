import React from "react";
import { View, Text } from "react-native";

export function Required({ xs, s, m, l, xl }) {
  return (
    <View>
      {xs ? <Text>{`XS: ${xs}`}</Text> : <View />}
      {s ? <Text>{`S: ${s}`}</Text> : <View />}
      {m ? <Text>{`M: ${m}`}</Text> : <View />}
      {l ? <Text>{`L: ${l}`}</Text> : <View />}
      {xl ? <Text>{`XL: ${xl}`}</Text> : <View />}
    </View>
  );
}
