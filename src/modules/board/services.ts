import { protectedMiddleware } from "@/integrations/better-auth/middleware";
import { drizzleMiddleware } from "@/integrations/drizzle/middleware";
import { schema } from "@/integrations/drizzle/schema";

import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import * as v from "valibot";

import { SELECT_BOARDS_DEFAULT_LIMIT } from "./constants";
import {
  AxisSchema,
  GetBoardsSchema,
  type GetBoardsSchemaArgs,
} from "./validation";

export const getBoards = createServerFn()
  .inputValidator(GetBoardsSchema)
  .middleware([drizzleMiddleware, protectedMiddleware])
  .handler(async ({ context, data }) => {
    const result = await context.db
      .select()
      .from(schema.board)
      .where(eq(schema.board.userId, context.user.id))
      .limit(SELECT_BOARDS_DEFAULT_LIMIT)
      .offset(SELECT_BOARDS_DEFAULT_LIMIT * data.page);

    return result.flatMap((board) => {
      const parsed = v.safeParse(AxisSchema, board.axis);
      return parsed.success ? [{ ...board, axis: parsed.output }] : [];
    });
  });

export const getBoardsQueryOptions = (args: GetBoardsSchemaArgs) => {
  return queryOptions({
    queryFn: (context) => {
      const [_key, args] = context.queryKey;
      return getBoards({ data: args, signal: context.signal });
    },
    queryKey: ["getBoards", args] as const,
  });
};
