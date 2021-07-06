// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports

// ** Imports
import { RESET } from '../../configs/constants'
import { PlayerReducer } from './playerReducer'
import { TeamReducer } from './teamReducer'


const parentReducer = combineReducers({
  Player:PlayerReducer,
  Team:TeamReducer
})

const rootReducer = (state, action) => {
  if (action.type === RESET) {
      state = undefined
  }
  return parentReducer(state, action);
}

export default rootReducer