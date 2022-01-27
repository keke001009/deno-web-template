import { delay } from "https://deno.land/std@0.122.0/async/delay.ts";
import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.122.0/testing/asserts.ts";
import db from "/db.ts";
import Post from "/domain/entities/Post.ts";
import Comment from "/domain/entities/Comment.ts";
import { readComments, writeComment } from "/domain/services/comment.ts";
import { Database } from "/deps.ts";
import { Client } from "https://deno.land/x/mysql/mod.ts";
import Random from "https://deno.land/x/random@v1.1.2/Random.js";

Deno.test("Comment 테스트", async (t) => {
  await db.sync();

  assertEquals(await writeComment(), 1);
  await db.close();
});

Deno.test("Comment 조회", async (t) => {
  await t.step("데이터 생성 확인", async (t) => {
    await db.sync({ drop: true });
    const r = new Random();
    const post = await Post.makeSample();
    const id = 1;
    await Comment.create([
      { content: r.string(5, Random.UPPER_ALPHABETS), postId: id },
      { content: r.string(5, Random.UPPER_ALPHABETS), postId: null },
      { content: r.string(5, Random.UPPER_ALPHABETS), postId: id },
    ]);

    const comments = await Post.where("id", 1).comments();
    assertEquals(comments.length, 2);
    await db.close();
  });
});

Deno.test("댓글 그룹화 하기", async () => {
  await db.sync();
  const comments = await readComments() || [];
  const results: any[] = [];
  assertEquals(comments, []);
  comments.forEach((item: Comment) => {
    console.log(item);
    if (item.parentId == 0) {
      results.push(item);
    }
  });

  await db.close();
});

Deno.test("게시물 및 댓글 조회", async (t) => {
  await t.step("특정 게시물의 하위 데이터 조회하기", async (t) => {
    await db.sync({ drop: true });
    const r = new Random();
    const post = await Post.makeSample();
    const post1 = await Post.makeSample();
    const id = 1;
    // assertEquals(post, 1);
    // assertEquals(id, 1);
    // await Comment.create([{ content : r.string( 5, Random.UPPER_ALPHABETS ), postId : id, depth : 1 },
    //   { content : r.string( 5, Random.UPPER_ALPHABETS ), postId : id, depth : 2  },
    //   { content : r.string( 5, Random.UPPER_ALPHABETS ), postId : id, depth : 3 },
    //   { content : r.string( 5, Random.UPPER_ALPHABETS ), postId : id, parentId : 1, depth : 1, groupId : 1 },
    //   { content : r.string( 5, Random.UPPER_ALPHABETS ), postId : id, parentId : 1, depth : 2, groupId : 1 },
    //   { content : r.string( 5, Random.UPPER_ALPHABETS ), postId : 2, parentId : 0, depth : 1, groupId: 2 }
    // ])
    await Comment.create([
      { content: "1번글 1", postId: id, depth: 1, groupId: 1 },
      { content: "1번글 2", postId: id, depth: 2, groupId: 2 },
      { content: "1번글 3", postId: id, depth: 3, groupId: 3 },
      { content: "1번글 1-1", postId: id, parentId: 1, depth: 1, groupId: 1 },
      { content: "1번글 1-2", postId: id, parentId: 1, depth: 2, groupId: 1 },
      { content: "2번글 1", postId: 2, parentId: 0, depth: 1, groupId: 1 },
    ]);

    // const post1 = await Post.makeSample()
    // const post1Id = 2
    // await Comment.create([{ content : r.string( 5, Random.UPPER_ALPHABETS ), postId : post1Id },
    //   { content : r.string( 5, Random.UPPER_ALPHABETS ), postId : post1Id, parentId : 6  },
    //   { content : r.string( 5, Random.UPPER_ALPHABETS ), postId : post1Id },
    //   { content : r.string( 5, Random.UPPER_ALPHABETS ), postId : post1Id, parentId : 7 },
    //   { content : r.string( 5, Random.UPPER_ALPHABETS ), postId : post1Id, parentId : 6 }
    // ])
    const comments = await readComments() || [];

    // assertEquals(comments.length, 6);
    // assertEquals(comments, 1);
    // comments.forEach((item : Comment)=>{
    //   console.log(item)
    //   if(item.parentId == 0) {
    //     results.push(item)
    //   }
    // })

    await db.close();
  });
});
