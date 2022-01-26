import { isHttpError, Router } from "oak";
import { Context } from "types";

export const errorHandler = async (
  { response }: Context,
  next: () => Promise<unknown>,
) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      console.log("isHttpError");
      response.body = { error: err.message };
      response.status = err.status;
    } else {
      console.error(err);
      response.body = { error: "System error" };
      response.status = 500;
      // throw err;
    }
  }
};
