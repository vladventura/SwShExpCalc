import React from "react";
import SearchableDropdown from "react-native-searchable-dropdown";

/** Redux store actions */
import { selectPokemon } from "../../redux/actions/infoActions";
import { connect } from "react-redux";
/** End of Redux store action */

const Selector = (props) => {
  return (
    <SearchableDropdown
      onTextChange={() => {}}
      onItemSelect={(item) => props.selectPokemon(item)}
      textInputStyle={{
        borderWidth: 2,
        borderColor: "white",
        backgroundColor: "#555",
        paddingLeft: 10,
        fontSize: 18,
        color: "white",
      }}
      itemStyle={{
        marginTop: 2,
        backgroundColor: "#555",
      }}
      itemTextStyle={{
        color: "white",
        paddingLeft: 25,
        fontSize: 18,
      }}
      itemsContainerStyle={{
        maxHeight: "75%",
        paddingTop: 5,
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
