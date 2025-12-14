import * as v from "valibot";

export const GetBoardsSchema = v.object({
  page: v.number(),
});

export type GetBoardsSchemaArgs = v.InferInput<typeof GetBoardsSchema>;

export const AxisItemSchema = v.object({
  id: v.string(),
  name: v.string(),
});

export const AxisSchema = v.object({
  x: v.array(AxisItemSchema),
  y: v.array(AxisItemSchema),
});
