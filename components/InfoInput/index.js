import React, { Component } from "react";
import { View, TextInput, Text } from "react-native";
import Selector from "../Selector";

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
    console.log("From InfoInput.setStartLevel(input): " + lvl);
    this.props.setStartingLevel(lvl);
  }

  setEndLevel(lvl) {
    console.log("From InfoInput.setEndLevel(input): " + lvl);
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
      <View>
        {this.props.pokemonData ? (
          <View>
            <Selector />
            {name && <Text>Chosen Pokemon: {name}</Text>}
            {exp && <Text>Exp. Curve: {exp}</Text>}
            <Text>Current Level:</Text>
            <TextInput
              onChangeText={(val) => this.setStartLevel(val)}
              keyboardType="numeric"
              value={start.toString() || ""}
            />
            <Text>Target Level:</Text>
            <TextInput
              onChangeText={(val) => this.setEndLevel(val)}
              keyboardType="numeric"
              value={end.toString() || ""}
            />
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
