import { DataTypes, Model } from "/deps.ts";
import { isNumber, minNumber, nullable, required, validate } from "validasaur";
import { v4 as uuid } from "https://deno.land/std@0.74.0/uuid/mod.ts";
import Post from "./Post.ts";
import { FieldValue } from "https://deno.land/x/denodb@v1.0.40/lib/data-types.ts";

/**
 * Post
 * @member id pk
 */
class Comment extends Model {
  static table = "comment";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    parentId: { type: DataTypes.INTEGER, allowNull: true },
    postId: { type: DataTypes.INTEGER, allowNull: true, primaryKey: false },
    content: { type: DataTypes.STRING },
    depth: { type: DataTypes.INTEGER },
    groupId: { type: DataTypes.INTEGER },
    delYn: { type: DataTypes.STRING, length: 1 },
  };

  static defaults = {
    parentId: 0,
    depth: 0,
    groupId: 0,
    delYn: "N",
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

  // Comment[]
  comments: any = [];
}

export default Comment;
