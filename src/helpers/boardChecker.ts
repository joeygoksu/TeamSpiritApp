export const boardChecker = (
  respBoard: any,
  teamId: string,
): [boolean, string | null] => {
  const boards = respBoard.data.listBoards.items;
  let result = false;
  let boardId;

  for (let index = 0; index < boards.length; index++) {
    const element = boards[index];

    if (element.boardTeamId === teamId) {
      boardId = element.id;
      result = true;
    }
  }

  return [result, boardId];
};
