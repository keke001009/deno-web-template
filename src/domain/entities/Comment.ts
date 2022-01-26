import { DataTypes, Model } from "/deps.ts";
import { isNumber, minNumber, nullable, required, validate } from "validasaur";
import { v4 as uuid } from "https://deno.land/std@0.74.0/uuid/mod.ts";
import Post from "./Post.ts";

/**
 * Post
 * @member id pk
 */
class Comment extends Model {
  static table = "comment";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    parentId: { type: DataTypes.INTEGER,allowNull: true, },
    content: { type: DataTypes.STRING },
  };

  static post() {
    return this.hasOne(Post);
  }

  static rules = {
    create: {
      parentId: [nullable, minNumber(0)],
      content: [required],
    },
    update: {
      parentId: [nullable, minNumber(0)],
      content: [required],
    },
    save: {
      parentId: [nullable, minNumber(0)],
      content: [required],
    },
  };
}

export default Comment;
