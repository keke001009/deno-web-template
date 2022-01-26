import { delay } from "https://deno.land/std@0.122.0/async/delay.ts";
import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.122.0/testing/asserts.ts";
import db from "/db.ts";
import { pagingPost } from "/domain/services/post.ts";
import { config, Database } from "/deps.ts";
// await db.sync()

Deno.test("Post 페이징 테스트", async (t) => {
  await db.sync();

  assertEquals(await pagingPost(), 1);
  await db.close();
});
