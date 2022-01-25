import { Middleware } from "../deps.ts";

export const authenticate: Middleware = async function (ctx, next) {
  console.log("authenticate");

  await next();
};
