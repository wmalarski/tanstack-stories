import { protectedMiddleware } from "@/integrations/better-auth/middleware";
import { drizzleMiddleware } from "@/integrations/drizzle/middleware";
import { schema } from "@/integrations/drizzle/schema";

import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import * as v from "valibot";

import { SELECT_BOARDS_DEFAULT_LIMIT } from "./constants";
import {
  type AxisDefinition,
  AxisSchema,
  GetBoardsSchema,
  type GetBoardsSchemaArgs,
  type InsertBoardArgs,
  InsertBoardSchema,
} from "./validation";

const getBoards = createServerFn()
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

export type GetBoardsReturn = Awaited<ReturnType<typeof getBoards>>;
export type GetBoardsReturnItem = GetBoardsReturn[0];

export const getBoardsQueryOptions = (args: GetBoardsSchemaArgs) => {
  return queryOptions({
    queryFn: (context) => {
      const [_key, args] = context.queryKey;
      return getBoards({ data: args, signal: context.signal });
    },
    queryKey: ["getBoards", args] as const,
  });
};

const insertBoard = createServerFn({ method: "POST" })
  .inputValidator(InsertBoardSchema)
  .middleware([drizzleMiddleware, protectedMiddleware])
  .handler(async ({ context, data }) => {
    const id = crypto.randomUUID();

    const axis: AxisDefinition = { x: [], y: [] };

    const result = await context.db.insert(schema.board).values({
      ...data,
      axis,
      id,
      userId: context.user.id,
    });

    return result.success;
  });

export const insertBoardMutationOptions = () => {
  return mutationOptions({
    mutationFn: (args: InsertBoardArgs) => {
      return insertBoard({ data: args });
    },
    onSuccess(_data, _variables, _onMutate, context) {
      return context.client.invalidateQueries({
        exact: false,
        queryKey: getBoardsQueryOptions({ page: 0 }).queryKey,
      });
    },
  });
};
