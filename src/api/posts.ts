import { Router, RouterContext } from "oak";
import { v4 as uuid } from "https://deno.land/std@0.74.0/uuid/mod.ts";

import Post from "/domain/Post.ts";

const router = new Router();

// R
router.get("/", async ({ response }) => {
  try {
    const posts = await Post.all();

    response.body = posts;
  } catch (err) {
    console.error(err);
    response.body = { error: "Something went wrong" };
    response.status = 500;
  }
});

// C
router.post("/sample", async ({ request, response }) => {
  try {
    const post = await Post.makeSample();
    response.body = post;
  } catch (err) {
    console.error(err);
    response.body = { error: "system error" };
    response.status = 500;
  }
});

// C
router.post("/", async ({ request, response }) => {
  try {
    const { username, content } = await request.body().value;

    const post = await Post.create({
      username,
      content,
      uuid: uuid.generate(),
    });

    response.body = post;
  } catch (err) {
    console.log(err);
    response.body = { error: "Something went wrong" };
    response.status = 500;
  }
});

// U
router.put("/:uuid", async ({ params, request, response }) => {
  const { username, content } = await request.body().value;
  try {
    const post = await Post.where("uuid", params.uuid).first();

    if (!post) {
      response.body = { post: "Post not found" };
      response.status = 404;
      return;
    }

    post.username = username;
    post.content = content;

    await post.update();

    response.body = post;
  } catch (err) {
    console.log(err);
    response.body = { error: "Something went wrong" };
    response.status = 500;
  }
});

// D
router.delete("/:uuid", async ({ params, response }) => {
  try {
    const post = await Post.where("uuid", params.uuid).first();

    if (!post) {
      response.body = { post: "Post not found" };
      response.status = 404;
      return;
    }

    await post.delete();

    response.body = { message: "Post deleted successfully" };
  } catch (err) {
    console.log(err);
    response.body = { error: "Something went wrong" };
    response.status = 500;
  }
});

// R : Find
router.get("/:uuid", async ({ params, response }) => {
  try {
    const post = await Post.where("uuid", params.uuid).first();

    if (!post) {
      response.body = { post: "Post not found" };
      response.status = 404;
      return;
    }

    response.body = post;
  } catch (err) {
    console.log(err);
    response.body = { error: "Something went wrong" };
    response.status = 500;
  }
});

export default router;
