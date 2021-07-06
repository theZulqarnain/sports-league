import { PLAYERS } from "../../configs/constants";

const INITIAL_STATE = {
    Players: {id:'111'},
};
export const PlayerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYERS: {
      return { ...state, Players: action.payload }
    }
    default: {
      return state
    }
  }
}