import { Context, httpErrors, Middleware, Router, RouterMiddleware } from "oak";
import { v4 as uuid } from "https://deno.land/std@0.74.0/uuid/mod.ts";

import Post from "/domain/entities/Post.ts";
import { UserRole } from "types";
import { checkRole, requestValidator, transaction } from "/middlewares/mod.ts";
import { isEmail, isNumber, required, validate } from "validasaur";

type api1 = [any];
type api2 = [any, any];
type api3 = [any, any, any];

const bodyRules = {
  username: [required],
  content: [required],
};

export const getPosts: api2 = [
  checkRole(UserRole.USER),
  async ({ response }: Context) => {
    throw new httpErrors.BadRequest("잘못된 요청입니다.");
    throw new Error("error");
    response.body = "12312"; // posts;
  },
];

export const createPost: api3 = [
  checkRole(UserRole.USER),
  requestValidator({ bodyRules }),
  async ({ request, response }: Context) => {
    const { username, content } = await request.body().value;

    const post = await Post.create({
      username,
      content,
      uuid: uuid.generate(),
    });

    response.body = post;
  },
];

export const updatePost = [
  checkRole(UserRole.USER),
  async ({ params, request, response }: any) => {
    const { username, content } = await request.body().value;
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
  },
];

export const deletePost = [
  checkRole(UserRole.USER),
  async ({ params, response }: any) => {
    const post = await Post.where("uuid", params.uuid).first();

    if (!post) {
      response.body = { post: "Post not found" };
      response.status = 404;
      return;
    }

    await post.delete();

    response.body = { message: "Post deleted successfully" };
  },
];

export const findPost = [
  checkRole(UserRole.USER),
  async ({ params, response }: any) => {
    const post = await Post.where("uuid", params.uuid).first();

    if (!post) {
      response.body = { post: "Post not found" };
      response.status = 404;
      return;
    }

    response.body = post;
  },
];

export const makeSample: api1 = [
  async ({ response }: Context) => {
    const post = await Post.makeSample();
    response.body = post;
  },
];
