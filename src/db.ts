import { Database, env } from "./deps.ts";

import Post from "./domain/Post.ts";

/**
 * mysql
 */
const db = new Database(
  {
    dialect: "mysql",
  },
  {
    host: env.DB_HOST,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
  },
);

db.link([Post]);

export default db;
