import axios from "axios";
import {
  ERROR_DISMISSED,
  FETCH_DROPDOWN_DATA,
  FETCH_DROPDOWN_ERROR,
  SELECT_POKEMON,
  SET_STARTING_LEVEL,
  SET_TARGET_LEVEL,
  VALIDATE_ERROR,
  VALIDATE_SUCCESS,
} from "./";
const pkmnData = "https://plan.pokemonteams.io/static/pokemon.json";

export const fetchDropdownData = () => {
  return (dispatch, getState) => {
    return axios
      .get(pkmnData)
      .then((resp) => {
        let data = resp.data;
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

        dispatch({
          type: FETCH_DROPDOWN_DATA,
          payload: finished,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: FETCH_DROPDOWN_ERROR,
          err,
        });
      });
  };
};

export const selectPokemon = (pokemon) => {
  return (dispatch, getState) => {
    dispatch({
      type: SELECT_POKEMON,
      payload: pokemon,
    });
  };
};

export const setStartingLevel = (level) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_STARTING_LEVEL,
      payload: level,
    });
  };
};

export const setEndingLevel = (level) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_TARGET_LEVEL,
      payload: level,
    });
  };
};

export const validate = () => {
  return (dispatch, getState) => {
    let currentState = getState();
    let { startingLevel, targetLevel } = currentState;
    startingLevel = parseInt(startingLevel);
    targetLevel = parseInt(targetLevel);
    if (!currentState.pokemon) {
      dispatch({
        type: VALIDATE_ERROR,
        errMessage: "Select a Pokemon",
      });
    } else if (!startingLevel) {
      dispatch({
        type: VALIDATE_ERROR,
        errMessage: "There's no starting level",
      });
    } else if (!targetLevel) {
      dispatch({
        type: VALIDATE_ERROR,
        errMessage: "There's no target level",
      });
    } else if (startingLevel <= 0) {
      dispatch({
        type: VALIDATE_ERROR,
        errMessage: "Starting level must be greater than 0",
      });
    } else if (targetLevel > 100) {
      dispatch({
        type: VALIDATE_ERROR,
        errMessage: "Target level must be less or equal to 100",
      });
    } else if (startingLevel >= targetLevel) {
      dispatch({
        type: VALIDATE_ERROR,
        errMessage:
          "Starting level cannot be greater than or equal to the target level",
      });
    } else {
      dispatch({
        type: VALIDATE_SUCCESS,
      });
    }
  };
};

export const errorDismised = () => {
  return (dispatch, getState) => {
    dispatch({
      type: ERROR_DISMISSED,
    });
  };
};
