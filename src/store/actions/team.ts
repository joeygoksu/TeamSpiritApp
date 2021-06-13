import { TEAM_ADD } from '../constants';

interface Team {
  hasTeam: boolean;
  teamName?: string;
  teamCode?: string;
}

export const addTeam = (payload: Team) => ({
  type: TEAM_ADD,
  payload: payload,
});
