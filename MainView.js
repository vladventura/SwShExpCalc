import React, { Component } from "react";
import { View, Text, Alert } from "react-native";
import InfoInput from "./components/InfoInput";
import Calculator from "./components/Calculator";

/** Redux store actions */
import { connect } from "react-redux";
import { errorDismised } from "./redux/actions/infoActions";
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
      <View>
        <Text>Candy Calc</Text>
        <InfoInput />
        <Calculator />
        {this.checkForAlert()}
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
