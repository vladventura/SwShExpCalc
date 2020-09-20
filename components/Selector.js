import React from "react";

import SearchableDropdown from "react-native-searchable-dropdown";

/** Redux store actions */
import { selectPokemon } from "../redux/actions/infoActions";
import { connect } from "react-redux";
/** End of Redux store action */

const Selector = (props) => {
  return (
    <SearchableDropdown
      onTextChange={(text) => console.log(text)}
      onItemSelect={(item) => props.selectPokemon(item)}
      containerStyle={{ padding: 5 }}
      textInputStyle={{
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#FAF7F6",
      }}
      itemStyle={{
        marginTop: 2,
        backgroundColor: "#FAF9F8",
        borderColor: "#bbb",
        borderWidth: 1,
      }}
      itemTextStyle={{
        color: "#222",
      }}
      itemsContainerStyle={{
        maxHeight: "50%",
      }}
      items={props.pokemonData}
      placeholder="Type the Poke's name"
      underlineColorAndroid="transparent"
    />
  );
};

const mapStateToProps = (state) => {
  return {
    pokemonData: state.pokemonData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectPokemon: (pkmn) => dispatch(selectPokemon(pkmn)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Selector);
