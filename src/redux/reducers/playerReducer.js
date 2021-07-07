import { PLAYERS } from "../../configs/constants";

const INITIAL_STATE = {
    Players: {
      'USR-001':{id:'USR-001',name:'Kane Williamson'},
      'USR-002':{id:'USR-002',name:'Jonny Bairstow'},
      'USR-003':{id:'USR-003',name:'Rohit Sharma'},
      'USR-004':{id:'USR-004',name:'MS Dhoni'},
      'USR-005':{id:'USR-005',name:'Jasprit Bumrah '},
      'USR-006':{id:'USR-006',name:'Rashid Khan'}
    },
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