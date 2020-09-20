import React, { Component } from "react";
import { View, Text, Alert, StyleSheet, ScrollView } from "react-native";
import InfoInput from "./components/InfoInput";
import Calculator from "./components/Calculator";
import styles from "./styles";
/** Redux store actions */
import { connect } from "react-redux";
import { errorDismised } from "./redux/actions/infoActions";
import Selector from "./components/Selector";
/** End of Redux store action */

class MainView extends Component {
  promptAlert = () =>
    Alert.alert(
      "Error",
      this.props.message,
      [
        {
          text: "OK",
          onPress: () => this.props.errorDismised(),
          style: "default",
        },
      ],
      { cancelable: false }
    );

  checkForAlert = () => {
    if (this.props.isValid === "dirty") {
      this.promptAlert();
    }
  };

  render() {
    return (
      <View style={[styles.container, styles.column, styles.mainContainer]}>
        <Text style={[styles.title, styles.textThemeDark]}>Candy Calc</Text>
        <View
          style={[
            styles.container,
            {
              height: "auto",
            },
          ]}
        >
          <Selector />
        </View>
        <ScrollView>
          <InfoInput />
          <Calculator />
          {this.checkForAlert()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isValid: state.isValid,
    message: state.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    errorDismised: () => dispatch(errorDismised()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
