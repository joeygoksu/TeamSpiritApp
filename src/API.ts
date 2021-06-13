/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTeamInput = {
  id?: string | null,
  name: string,
  members?: Array< string | null > | null,
  prevNode?: string | null,
  nextNode?: string | null,
  teamBoardId?: string | null,
};

export type ModelTeamConditionInput = {
  name?: ModelStringInput | null,
  members?: ModelStringInput | null,
  prevNode?: ModelStringInput | null,
  nextNode?: ModelStringInput | null,
  and?: Array< ModelTeamConditionInput | null > | null,
  or?: Array< ModelTeamConditionInput | null > | null,
  not?: ModelTeamConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Team = {
  __typename: "Team",
  id?: string,
  name?: string,
  members?: Array< string | null > | null,
  board?: Board,
  prevNode?: string | null,
  nextNode?: string | null,
  createdAt?: string,
  updatedAt?: string,
};

export type Board = {
  __typename: "Board",
  id?: string,
  name?: string | null,
  team?: Team,
  scores?: ModelScoreConnection,
  createdAt?: string,
  updatedAt?: string,
};

export type ModelScoreConnection = {
  __typename: "ModelScoreConnection",
  items?:  Array<Score | null > | null,
  nextToken?: string | null,
};

export type Score = {
  __typename: "Score",
  id?: string,
  user_id?: string,
  score?: number,
  board?: Board,
  createdAt?: string,
  updatedAt?: string,
  owner?: string | null,
};

export type UpdateTeamInput = {
  id: string,
  name?: string | null,
  members?: Array< string | null > | null,
  prevNode?: string | null,
  nextNode?: string | null,
  teamBoardId?: string | null,
};

export type DeleteTeamInput = {
  id: string,
};

export type CreateBoardInput = {
  id?: string | null,
  name?: string | null,
  boardTeamId?: string | null,
};

export type ModelBoardConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelBoardConditionInput | null > | null,
  or?: Array< ModelBoardConditionInput | null > | null,
  not?: ModelBoardConditionInput | null,
};

export type UpdateBoardInput = {
  id: string,
  name?: string | null,
  boardTeamId?: string | null,
};

export type DeleteBoardInput = {
  id: string,
};

export type CreateScoreInput = {
  id?: string | null,
  user_id: string,
  score: number,
  scoreBoardId: string,
};

export type ModelScoreConditionInput = {
  user_id?: ModelStringInput | null,
  score?: ModelFloatInput | null,
  and?: Array< ModelScoreConditionInput | null > | null,
  or?: Array< ModelScoreConditionInput | null > | null,
  not?: ModelScoreConditionInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateScoreInput = {
  user_id?: string | null,
  score?: number | null,
  scoreBoardId?: string | null,
};

export type DeleteScoreInput = {
  id: string,
};

export type ModelTeamFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  members?: ModelStringInput | null,
  prevNode?: ModelStringInput | null,
  nextNode?: ModelStringInput | null,
  and?: Array< ModelTeamFilterInput | null > | null,
  or?: Array< ModelTeamFilterInput | null > | null,
  not?: ModelTeamFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelTeamConnection = {
  __typename: "ModelTeamConnection",
  items?:  Array<Team | null > | null,
  nextToken?: string | null,
};

export type ModelBoardFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelBoardFilterInput | null > | null,
  or?: Array< ModelBoardFilterInput | null > | null,
  not?: ModelBoardFilterInput | null,
};

export type ModelBoardConnection = {
  __typename: "ModelBoardConnection",
  items?:  Array<Board | null > | null,
  nextToken?: string | null,
};

export type ModelScoreFilterInput = {
  user_id?: ModelStringInput | null,
  score?: ModelFloatInput | null,
  and?: Array< ModelScoreFilterInput | null > | null,
  or?: Array< ModelScoreFilterInput | null > | null,
  not?: ModelScoreFilterInput | null,
};

export type CreateTeamMutationVariables = {
  input?: CreateTeamInput,
  condition?: ModelTeamConditionInput | null,
};

export type CreateTeamMutation = {
  createTeam?:  {
    __typename: "Team",
    id: string,
    name: string,
    members?: Array< string | null > | null,
    board?:  {
      __typename: "Board",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    prevNode?: string | null,
    nextNode?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTeamMutationVariables = {
  input?: UpdateTeamInput,
  condition?: ModelTeamConditionInput | null,
};

export type UpdateTeamMutation = {
  updateTeam?:  {
    __typename: "Team",
    id: string,
    name: string,
    members?: Array< string | null > | null,
    board?:  {
      __typename: "Board",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    prevNode?: string | null,
    nextNode?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTeamMutationVariables = {
  input?: DeleteTeamInput,
  condition?: ModelTeamConditionInput | null,
};

export type DeleteTeamMutation = {
  deleteTeam?:  {
    __typename: "Team",
    id: string,
    name: string,
    members?: Array< string | null > | null,
    board?:  {
      __typename: "Board",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    prevNode?: string | null,
    nextNode?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateBoardMutationVariables = {
  input?: CreateBoardInput,
  condition?: ModelBoardConditionInput | null,
};

export type CreateBoardMutation = {
  createBoard?:  {
    __typename: "Board",
    id: string,
    name?: string | null,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      members?: Array< string | null > | null,
      prevNode?: string | null,
      nextNode?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateBoardMutationVariables = {
  input?: UpdateBoardInput,
  condition?: ModelBoardConditionInput | null,
};

export type UpdateBoardMutation = {
  updateBoard?:  {
    __typename: "Board",
    id: string,
    name?: string | null,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      members?: Array< string | null > | null,
      prevNode?: string | null,
      nextNode?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteBoardMutationVariables = {
  input?: DeleteBoardInput,
  condition?: ModelBoardConditionInput | null,
};

export type DeleteBoardMutation = {
  deleteBoard?:  {
    __typename: "Board",
    id: string,
    name?: string | null,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      members?: Array< string | null > | null,
      prevNode?: string | null,
      nextNode?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateScoreMutationVariables = {
  input?: CreateScoreInput,
  condition?: ModelScoreConditionInput | null,
};

export type CreateScoreMutation = {
  createScore?:  {
    __typename: "Score",
    id: string,
    user_id: string,
    score: number,
    board:  {
      __typename: "Board",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateScoreMutationVariables = {
  input?: UpdateScoreInput,
  condition?: ModelScoreConditionInput | null,
};

export type UpdateScoreMutation = {
  updateScore?:  {
    __typename: "Score",
    id: string,
    user_id: string,
    score: number,
    board:  {
      __typename: "Board",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteScoreMutationVariables = {
  input?: DeleteScoreInput,
  condition?: ModelScoreConditionInput | null,
};

export type DeleteScoreMutation = {
  deleteScore?:  {
    __typename: "Score",
    id: string,
    user_id: string,
    score: number,
    board:  {
      __typename: "Board",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetTeamQueryVariables = {
  id?: string,
};

export type GetTeamQuery = {
  getTeam?:  {
    __typename: "Team",
    id: string,
    name: string,
    members?: Array< string | null > | null,
    board?:  {
      __typename: "Board",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    prevNode?: string | null,
    nextNode?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTeamsQueryVariables = {
  filter?: ModelTeamFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTeamsQuery = {
  listTeams?:  {
    __typename: "ModelTeamConnection",
    items?:  Array< {
      __typename: "Team",
      id: string,
      name: string,
      members?: Array< string | null > | null,
      prevNode?: string | null,
      nextNode?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetBoardQueryVariables = {
  id?: string,
};

export type GetBoardQuery = {
  getBoard?:  {
    __typename: "Board",
    id: string,
    name?: string | null,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      members?: Array< string | null > | null,
      prevNode?: string | null,
      nextNode?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListBoardsQueryVariables = {
  filter?: ModelBoardFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBoardsQuery = {
  listBoards?:  {
    __typename: "ModelBoardConnection",
    items?:  Array< {
      __typename: "Board",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetScoreQueryVariables = {
  id?: string,
};

export type GetScoreQuery = {
  getScore?:  {
    __typename: "Score",
    id: string,
    user_id: string,
    score: number,
    board:  {
      __typename: "Board",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListScoresQueryVariables = {
  filter?: ModelScoreFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListScoresQuery = {
  listScores?:  {
    __typename: "ModelScoreConnection",
    items?:  Array< {
      __typename: "Score",
      id: string,
      user_id: string,
      score: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateTeamSubscription = {
  onCreateTeam?:  {
    __typename: "Team",
    id: string,
    name: string,
    members?: Array< string | null > | null,
    board?:  {
      __typename: "Board",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    prevNode?: string | null,
    nextNode?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTeamSubscription = {
  onUpdateTeam?:  {
    __typename: "Team",
    id: string,
    name: string,
    members?: Array< string | null > | null,
    board?:  {
      __typename: "Board",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    prevNode?: string | null,
    nextNode?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTeamSubscription = {
  onDeleteTeam?:  {
    __typename: "Team",
    id: string,
    name: string,
    members?: Array< string | null > | null,
    board?:  {
      __typename: "Board",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    prevNode?: string | null,
    nextNode?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateBoardSubscription = {
  onCreateBoard?:  {
    __typename: "Board",
    id: string,
    name?: string | null,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      members?: Array< string | null > | null,
      prevNode?: string | null,
      nextNode?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateBoardSubscription = {
  onUpdateBoard?:  {
    __typename: "Board",
    id: string,
    name?: string | null,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      members?: Array< string | null > | null,
      prevNode?: string | null,
      nextNode?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteBoardSubscription = {
  onDeleteBoard?:  {
    __typename: "Board",
    id: string,
    name?: string | null,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      members?: Array< string | null > | null,
      prevNode?: string | null,
      nextNode?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateScoreSubscriptionVariables = {
  owner?: string,
};

export type OnCreateScoreSubscription = {
  onCreateScore?:  {
    __typename: "Score",
    id: string,
    user_id: string,
    score: number,
    board:  {
      __typename: "Board",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateScoreSubscriptionVariables = {
  owner?: string,
};

export type OnUpdateScoreSubscription = {
  onUpdateScore?:  {
    __typename: "Score",
    id: string,
    user_id: string,
    score: number,
    board:  {
      __typename: "Board",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteScoreSubscriptionVariables = {
  owner?: string,
};

export type OnDeleteScoreSubscription = {
  onDeleteScore?:  {
    __typename: "Score",
    id: string,
    user_id: string,
    score: number,
    board:  {
      __typename: "Board",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
