import { Application, Router } from "oak";
import { authenticate, logger, responseTimeHeader } from "/middlewares/mod.ts";

import postsRouter from "./api/posts.ts";

const app = new Application();
const router = new Router();

app.use(authenticate);
app.use(logger);
app.use(responseTimeHeader);

router.get("/api", ({ response }) => {
  response.body = { message: "Hello World! Deno" };
});

app.use(router.routes());
app.use(postsRouter.prefix("/api/posts").routes());
app.use(router.allowedMethods());

export default app;
