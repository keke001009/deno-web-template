import { Middleware } from "../deps.ts";
import { Context } from "types";

export const authenticate: Middleware = async function (ctx: Context, next) {
  console.log("authenticate");
  ctx.user = {
    id: "test",
    permission: 1,
  };
  await next();
};
