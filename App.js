import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

import InfoInput from "./components/InfoInput";
import Calculator from "./components/Calculator";

/** Redux store components */
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers/rootReducer";
import MainView from "./MainView";
/** End of Redux store components */

const store = createStore(rootReducer, applyMiddleware(thunk));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.mainAppContainer}>
          <MainView />
          <StatusBar style="auto" />
        </View>
      </Provider>
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
