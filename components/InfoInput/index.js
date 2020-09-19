import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  DevSettings,
  Alert,
  BackHandler,
} from "react-native";
import { Selector } from "../Selector";

export class InfoInput extends Component {
  componentDidMount() {
    this.props.setClickCalc(() => this.validate());
    this.setStartLevel(this.state.startingLevel);
    this.setEndLevel(this.state.targetLevel);
    fetch("https://plan.pokemonteams.io/static/pokemon.json")
      .then((resp) => resp.json())
      .catch((err) => {
        Alert.alert(
          "No internet connection",
          "Currently we failed contacting the internet. Press OK to reload the app, or Cancel to exit.",
          [
            {
              text: "OK",
              onPress: () => DevSettings.reload(),
              style: "default",
            },
            {
              text: "Cancel",
              onPress: () => BackHandler.exitApp(),
              style: "cancel",
            },
          ]
        );
      })
      .then((data) => {
        let slug, slugs, len;
        let finished = [];
        slugs = Object.keys(data);
        len = slugs.length;

        for (let x = 0; x < len; x++) {
          slug = slugs[x];
          finished.push({
            id: data[slug].id,
            name: data[slug].name,
            exp: data[slug].exp,
          });
        }
        this.setState({
          pokemonData: finished,
          loaded: true,
        });
      });
  }

  state = {
    pokemon: {},
    startingLevel: 1,
    targetLevel: 50,
    pokemonData: [],
    loaded: false,
    errors: false,
  };

  changePokemon(pkmn) {
    console.log(pkmn);
    this.setState({
      pokemon: pkmn,
    });
    this.props.onExpChange(pkmn.exp);
  }

  setStartLevel(lvl) {
    console.log("From InfoInput.setStartLevel(input): " + lvl);
    this.setState({
      startingLevel: lvl || "",
    });
    this.props.onStartingChange(lvl || "");
  }

  validate() {
    let { startingLevel, targetLevel, pokemon } = this.state;
    if (!pokemon) return "Select a Pokemon";
    else if (!startingLevel) return "There's no starting level";
    else if (!targetLevel) return "There's no target level";
    else if (startingLevel <= 0) return "Starting level must be greater than 0";
    else if (targetLevel > 100) return "Target level must be 100 or less";
    else if (startingLevel >= targetLevel)
      return "Starting level cannot be greater than or equal to target level";
    else return "";
  }

  setEndLevel(lvl) {
    console.log("From InfoInput.setEndLevel(input): " + lvl);
    this.setState({
      targetLevel: lvl || "",
    });
    this.props.onTargetChange(lvl || "");
  }

  render() {
    let expCurve = this.state.pokemon.exp;
    let name = this.state.pokemon.name;
    let start = this.state.startingLevel;
    let end = this.state.targetLevel;
    return (
      <View>
        {this.state.loaded ? (
          <View>
            <Selector
              selectedValue={this.state.pokemon}
              setSelectedValue={(pkmn) => this.changePokemon(pkmn)}
              values={this.state.pokemonData}
            />
            <Text>Chosen Pokemon: {name}</Text>
            <Text>Exp. Curve: {expCurve}</Text>
            <Text>Current Level: {start || ""}</Text>
            <TextInput
              onChangeText={(val) => this.setStartLevel(val)}
              keyboardType="numeric"
              value={start.toString() || ""}
            />
            <Text>Target Level: {end || ""}</Text>
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
