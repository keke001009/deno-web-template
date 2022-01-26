import { Context, httpErrors, Middleware, Router, RouterMiddleware } from "oak";
import { v4 as uuid } from "https://deno.land/std@0.74.0/uuid/mod.ts";

import Post from "/domain/entities/Post.ts";
import { UserRole } from "types";
import { checkRole, transaction } from "/middlewares/mod.ts";
import db from "../db.ts";

type api2 = [any, any];
type api3 = [any, any, any];

export const getPosts: api2 = [
  checkRole(UserRole.USER),
  async ({ response }: Context) => {
    throw new httpErrors.BadRequest("잘못된 요청입니다.");
    throw new Error("error");
    response.body = "12312"; // posts;
  },
];

export const makeSample = [
  checkRole(UserRole.USER),
  async ({ response }: Context) => {
    try {
      const post = await Post.makeSample();
      response.body = post;
    } catch (err) {
      console.error(err);
      response.body = { error: "system error" };
      response.status = 500;
    }
  },
];

export const createPost = [
  checkRole(UserRole.USER),
  async ({ request, response }: Context) => {
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
  },
];

export const updatePost = [
  checkRole(UserRole.USER),
  async ({ params, request, response }: any) => {
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
  },
];

export const deletePost = [
  checkRole(UserRole.USER),
  async ({ params, response }: any) => {
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
  },
];

export const findPost = [
  checkRole(UserRole.USER),
  async ({ params, response }: any) => {
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
  },
];
