import React, { Component } from "react";
import {View, TextInput, Text} from 'react-native';
import {Selector} from '../Selector';

const placeholder = [
    {name: "Deino", exp: "Slow"},
    {name: "Gastrodon", exp: "Medium Slow"}
]

export class InfoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
        info : {
            pokemon: {},
            startingLevel: 0,
            targetLevel: 0
        }
    };
  }

  changePokemon(pkmn) {
      const newState = {
          info: {
              ...this.state.info,
              pokemon: pkmn
          }
      };
      this.setState({
          ...newState
      });
  }

  setStartLevel(lvl) {
      const newState = {
          info: {
              ...this.state.info,
              startingLevel: lvl
          }
      }
      this.setState({
          ...newState
      })
  }

  setEndLevel(lvl) {
      const newState = {
          info: {
              ...this.state.info,
              targetLevel: lvl
          }
      }
      this.setState({
          ...newState
      })
  }

  render() {
      let expCurve = this.state.info.pokemon.exp;
      let start = this.state.info.startingLevel;
      let end = parseInt(this.state.info.targetLevel);
      return (
          <View>
              <Selector
                selectedValue={this.state.info.pokemon}
                setSelectedValue={(pkmn) => this.changePokemon(pkmn)}
                values={placeholder}
              />
              <Text>Exp. Curve: {expCurve}</Text>
              <Text>Current Level: {start || ""}</Text>
              <TextInput 
                onChangeText={(itm) => this.setStartLevel(itm)}
                keyboardType="numeric"
                value={start}
              />
              <Text>Target Level: {end || ""}</Text>
              <TextInput 
                onChangeText={(itm) => this.setEndLevel(itm)}
                keyboardType="numeric"
                value={end}
              />
          </View>
      );
  }
}
