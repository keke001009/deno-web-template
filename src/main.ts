import db from "./db.ts";
import app from "./app.ts";
import { env } from "/deps.ts";

const port = env.PORT;

await db.sync();
await app.listen({ port: Number(env.PORT || 5000) });
console.log(`Server up on http://localhost:${port}`);
