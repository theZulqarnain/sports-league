import { PLAYERS } from "../../configs/constants";

const INITIAL_STATE = {
    Players: {
      'USR-001':{id:'USR-001',name:'Kane Williamson',team:'Sunrisers Hyderabad'},
      'USR-002':{id:'USR-002',name:'Jonny Bairstow',team:'Sunrisers Hyderabad'},
      'USR-003':{id:'USR-003',name:'Rohit Sharma',team:'Mumbai Indians'},
      'USR-004':{id:'USR-004',name:'MS Dhoni',team:'Chennai Super Kings'},
      'USR-005':{id:'USR-005',name:'Jasprit Bumrah ',team:'Mumbai Indians'},
      'USR-006':{id:'USR-006',name:'Rashid Khan',team:'Sunrisers Hyderabad'}
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