import { Context } from "oak";
// import db from "/db.ts";

export const transaction = async (
  { response }: Context,
  next: () => Promise<void>,
) => {
  try {
    // 동작안함 추후 기능 검토 필요
    // await db.transaction(async () => {
    // await next()
    // });
    await next();
  } catch (err) {
    console.error(err);
  }
};
