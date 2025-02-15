import React, { Component } from "react";
import { View, TextInput, Text } from "react-native";
import styles from "../../styles";
/** Redux store actions */
import {
  fetchDropdownData,
  setEndingLevel,
  setStartingLevel,
} from "../../redux/actions/infoActions";
import { connect } from "react-redux";
/** End of Redux store action */

class InfoInput extends Component {
  componentDidMount() {
    this.props.fetchDropdownData();
  }

  setStartLevel(lvl) {
    this.props.setStartingLevel(lvl);
  }

  setEndLevel(lvl) {
    this.props.setEndingLevel(lvl);
  }

  render() {
    let name, exp;
    if (this.props.pokemon) {
      name = this.props.pokemon.name;
      exp = this.props.pokemon.exp;
    }
    let start = this.props.startingLevel;
    let end = this.props.targetLevel;
    return (
      <View style={[styles.container, styles.row]}>
        {this.props.pokemonData ? (
          <View style={[styles.column]}>
            {name && exp && (
              <View style={[styles.column, styles.chosenExpDisplay]}>
                <Text style={[styles.text, styles.textThemeDark]}>
                  Chosen Pokemon: {name}
                </Text>
                <Text style={[styles.text, styles.textThemeDark]}>
                  Exp. Curve: {exp}
                </Text>
              </View>
            )}
            <View
              style={[styles.container, styles.row, styles.numInputContainer]}
            >
              <Text style={[styles.text, styles.textThemeDark]}>
                Start Level:
              </Text>
              <TextInput
                style={[styles.numInput, styles.levelInput]}
                onChangeText={(val) => this.setStartLevel(val)}
                keyboardType="numeric"
                value={start.toString() || ""}
              />
            </View>
            <View
              style={[styles.container, styles.row, styles.numInputContainer]}
            >
              <Text style={[styles.text, styles.textThemeDark]}>
                Target Level:
              </Text>
              <TextInput
                style={[styles.numInput, styles.levelInput]}
                onChangeText={(val) => this.setEndLevel(val)}
                keyboardType="numeric"
                value={end.toString() || ""}
              />
            </View>
          </View>
        ) : (
          <View>
            <Text>Loading</Text>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDropdownData: () => dispatch(fetchDropdownData()),
    setStartingLevel: (pkmn) => dispatch(setStartingLevel(pkmn)),
    setEndingLevel: (pkmn) => dispatch(setEndingLevel(pkmn)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoInput);
