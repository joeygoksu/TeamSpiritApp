import { LOGOUT_USER, TEAM_ADD } from '../constants';

const initialState = {
  hasTeam: false,
};

export const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEAM_ADD:
      return {
        ...state,
        hasTeam: action.payload.hasTeam,
        teamName: action.payload.teamName,
        teamCode: action.payload.teamCode,
      };
    case LOGOUT_USER:
      return {
        state: undefined,
      };

    default:
      return state;
  }
};
