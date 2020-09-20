import {
  ERROR_DISMISSED,
  FETCH_DROPDOWN_DATA,
  FETCH_DROPDOWN_ERROR,
  SELECT_POKEMON,
  SET_STARTING_LEVEL,
  SET_TARGET_LEVEL,
  VALIDATE_CLEAR,
  VALIDATE_ERROR,
  VALIDATE_SUCCESS,
} from "../actions";

let initialState = {
  pokemon: null,
  startingLevel: 1,
  targetLevel: 50,
  pokemonData: [],
  errors: "",
  isValid: "initial",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DROPDOWN_DATA:
      return {
        ...state,
        pokemonData: action.payload,
      };
    case FETCH_DROPDOWN_ERROR:
      return {
        ...state,
        errors:
          "There has been an error trying to fetch the necessary data. Please check your internet connection and try again.",
      };
    case SELECT_POKEMON:
      return {
        ...state,
        pokemon: action.payload,
      };
    case SET_STARTING_LEVEL:
      return {
        ...state,
        startingLevel: action.payload,
      };
    case SET_TARGET_LEVEL:
      return {
        ...state,
        targetLevel: action.payload,
      };
    case VALIDATE_SUCCESS:
      return {
        ...state,
        isValid: "clean",
      };
    case VALIDATE_ERROR:
      return {
        ...state,
        errors: action.errMessage,
        isValid: "dirty",
      };
    case ERROR_DISMISSED:
      return {
        ...state,
        errors: "",
        isValid: "initial",
      };
    default:
      return state;
  }
};

export default rootReducer;
