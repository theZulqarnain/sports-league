import { TEAMS } from "../../configs/constants";

const INITIAL_STATE = {
    Teams: {id:'test'},
};
export const TeamReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TEAMS: {
      return { ...state, Teams: action.payload }
    }
    default: {
      return state
    }
  }
}