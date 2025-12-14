import { useSuspenseQuery } from "@tanstack/react-query";

import { getBoardsQueryOptions } from "./services";

export const BoardList = () => {
  const getBoardsQuery = useSuspenseQuery(getBoardsQueryOptions({ page: 0 }));

  return (
    <>
      {getBoardsQuery.data.map((board) => (
        <pre key={board.id}>{JSON.stringify(board, null, 2)}</pre>
      ))}
    </>
  );
};
