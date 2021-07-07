import { TEAMS } from "../../configs/constants";

const INITIAL_STATE = {
    Teams: {
        'TM-0001':{id:'TM-0001',name:'Sunrisers Hyderabad',players:['USR-001','USR-002','USR-006']},
        'TM-0002':{id:'TM-0002',name:'Mumbai Indians',players:['USR-003','USR-005']},
        'TM-0003':{id:'TM-0003',name:'Chennai Super Kings',players:['USR-004']},
      },
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