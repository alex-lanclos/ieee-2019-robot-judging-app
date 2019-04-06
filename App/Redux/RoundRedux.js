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

  console.tron.log("round", round);
  console.tron.log("state[round]", state[round]);

  let oldRound = state[round];
  let index = oldRound.findIndex(cur => {
    return cur.id === team.id;
  });

  if (index > -1) {
    const updatedTean = { ...oldRound[index], ...team };
    const newRound = [
      ...oldRound.slice(0, index),
      updatedTean,
      ...oldRound.slice(index + 1)
    ];
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
