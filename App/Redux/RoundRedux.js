import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addTeam: ["team", "round"],
  updateTeam: ["team", "round"]
});

export const RoundTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  roundOne: [],
  roundTwo: [],
  roundThree: []
});

/* ------------- Reducers ------------- */

export const addTeam = (state, action) => {
  const { team, round } = action;
  return state.merge({ [round]: [...state[round], team] });
};

export const updateTeam = (state, action) => {
  const { team, round } = action;
  let newRound = state[round];

  let index = state[round].findIndex(cur => {
    return cur.id === team.id;
  });

  console.tron.log("index", index);

  if (index > -1) {
    newRound[index] = team;
    return state.merge({ [round]: newRound });
  } else {
    return state.merge({ [round]: [...state[round], team] });
  }
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_TEAM]: addTeam,
  [Types.UPDATE_TEAM]: updateTeam
});
