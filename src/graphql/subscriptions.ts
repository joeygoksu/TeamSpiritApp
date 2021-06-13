/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTeam = /* GraphQL */ `
  subscription OnCreateTeam {
    onCreateTeam {
      id
      name
      members
      board {
        id
        name
        createdAt
        updatedAt
      }
      prevNode
      nextNode
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTeam = /* GraphQL */ `
  subscription OnUpdateTeam {
    onUpdateTeam {
      id
      name
      members
      board {
        id
        name
        createdAt
        updatedAt
      }
      prevNode
      nextNode
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTeam = /* GraphQL */ `
  subscription OnDeleteTeam {
    onDeleteTeam {
      id
      name
      members
      board {
        id
        name
        createdAt
        updatedAt
      }
      prevNode
      nextNode
      createdAt
      updatedAt
    }
  }
`;
export const onCreateBoard = /* GraphQL */ `
  subscription OnCreateBoard {
    onCreateBoard {
      id
      name
      team {
        id
        name
        members
        prevNode
        nextNode
        createdAt
        updatedAt
      }
      scores {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateBoard = /* GraphQL */ `
  subscription OnUpdateBoard {
    onUpdateBoard {
      id
      name
      team {
        id
        name
        members
        prevNode
        nextNode
        createdAt
        updatedAt
      }
      scores {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteBoard = /* GraphQL */ `
  subscription OnDeleteBoard {
    onDeleteBoard {
      id
      name
      team {
        id
        name
        members
        prevNode
        nextNode
        createdAt
        updatedAt
      }
      scores {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateScore = /* GraphQL */ `
  subscription OnCreateScore($owner: String!) {
    onCreateScore(owner: $owner) {
      id
      user_id
      score
      board {
        id
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateScore = /* GraphQL */ `
  subscription OnUpdateScore($owner: String!) {
    onUpdateScore(owner: $owner) {
      id
      user_id
      score
      board {
        id
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteScore = /* GraphQL */ `
  subscription OnDeleteScore($owner: String!) {
    onDeleteScore(owner: $owner) {
      id
      user_id
      score
      board {
        id
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
