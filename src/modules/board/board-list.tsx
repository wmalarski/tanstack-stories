import { useSuspenseQuery } from "@tanstack/react-query";

import { InsertBoardDialog } from "./insert-board-dialog";
import { getBoardsQueryOptions } from "./services";

export const BoardList = () => {
  const getBoardsQuery = useSuspenseQuery(getBoardsQueryOptions({ page: 0 }));

  return (
    <>
      <InsertBoardDialog />
      {getBoardsQuery.data.map((board) => (
        <pre key={board.id}>{JSON.stringify(board, null, 2)}</pre>
      ))}
    </>
  );
};
