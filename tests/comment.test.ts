import { delay } from "https://deno.land/std@0.122.0/async/delay.ts";
import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.122.0/testing/asserts.ts";
import db from "/db.ts";
import { writeComment, readComments } from "/domain/services/comment.ts";
import { Database } from "/deps.ts";
import { Client } from "https://deno.land/x/mysql/mod.ts";

Deno.test("Comment 테스트", async (t) => {
  await db.sync();

  assertEquals(await writeComment(), 1);
  await db.close();
});

Deno.test("Comment 조회", async (t) => {
  await db.sync();
  const client = db.getClient() as Client
  const result = await client.execute(`
  select  * from comment
  `)
  assertEquals(result, 1)
  const data = await readComments()
  console.log(data)
  assertEquals(data, 1);
  await db.close();
});

