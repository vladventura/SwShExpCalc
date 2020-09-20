import React from "react";
import { View, Text } from "react-native";
import styles from "../../styles";

export function Required({ xs, s, m, l, xl }) {
  return (
    <View style={[styles.container, styles.column]}>
      {xs ? (
        <Text style={[styles.text, styles.textThemeDark]}>{`XS: ${xs}`}</Text>
      ) : (
        <View />
      )}
      {s ? (
        <Text style={[styles.text, styles.textThemeDark]}>{`S: ${s}`}</Text>
      ) : (
        <View />
      )}
      {m ? (
        <Text style={[styles.text, styles.textThemeDark]}>{`M: ${m}`}</Text>
      ) : (
        <View />
      )}
      {l ? (
        <Text style={[styles.text, styles.textThemeDark]}>{`L: ${l}`}</Text>
      ) : (
        <View />
      )}
      {xl ? (
        <Text style={[styles.text, styles.textThemeDark]}>{`XL: ${xl}`}</Text>
      ) : (
        <View />
      )}
    </View>
  );
}
