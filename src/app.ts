import { Application, Router } from "oak";
import {
  authenticate,
  errorHandler,
  logger,
  responseTimeHeader,
} from "middlewares";

import routes from "./api/mod.ts";

const app = new Application();
const router = new Router();

app.use(authenticate);
app.use(logger);
app.use(responseTimeHeader);

router.get("/api", ({ response }) => {
  response.body = { message: "Hello World! Deno" };
});

app.use(router.routes());
app.use(errorHandler, routes.routes());
app.use(router.allowedMethods());

export default app;
