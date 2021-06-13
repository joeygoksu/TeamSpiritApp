// Imports: Dependencies
import { combineReducers } from 'redux';
// Imports: Reducers
import { authReducer, onboardReducer, teamReducer } from './reducers';

// Redux: Root Reducer
export const rootReducer = combineReducers({
  auth: authReducer,
  onboard: onboardReducer,
  team: teamReducer,
});
