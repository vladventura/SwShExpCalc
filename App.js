import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";

import { InfoInput } from "./components/InfoInput";
import { Calculator } from "./components/Calculator";

export default class App extends React.Component {
  state = {
    startingLevel: 0,
    targetLevel: 0,
    xp: "",
    onClick: () => {},
  };

  render() {
    return (
      <View style={styles.mainAppContainer}>
        <Text>Candy Calc</Text>
        <View>
          <InfoInput
            setClickCalc={(fn) => {
              this.setState({ onClick: fn });
            }}
            onStartingChange={(start) =>
              this.setState({ startingLevel: start })
            }
            onTargetChange={(end) => this.setState({ targetLevel: end })}
            onExpChange={(xp) => {
              this.setState({ xp: xp });
            }}
          />
        </View>
        <Calculator
          onCandyChange={(val, prp) => {
            this.setState({ ...this.state, [prp]: val });
          }}
          start={this.state.startingLevel}
          end={this.state.targetLevel}
          exp={this.state.xp}
          onClickCalc={() => this.state.onClick()}
        />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainAppContainer: {
    backgroundColor: "#fadfac",
    height: "100%",
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
  },
});
