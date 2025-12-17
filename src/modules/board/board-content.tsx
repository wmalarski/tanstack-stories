import { useSuspenseQuery } from "@tanstack/react-query";

import { getBoardQueryOptions } from "./services";

type BoardContentProps = {
  boardId: string;
};

export const BoardContent = ({ boardId }: BoardContentProps) => {
  const getBoardQuery = useSuspenseQuery(getBoardQueryOptions({ boardId }));

  return <pre>{JSON.stringify(getBoardQuery.data, null, 2)}</pre>;
};

const AddAxisPopover = () => {
  return null;
};
