import { DataTypes, Model } from "/deps.ts";
import { v4 as uuid } from "https://deno.land/std@0.74.0/uuid/mod.ts";

/**
 * Post
 * @class Post
 * @member {id} pk
 * @member {uuid} uuid
 * @member {username} user아이디
 * @member {content} content
 */
class User extends Model {
  static table = "users";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    uuid: { type: DataTypes.UUID },
    username: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING },
  };
}

export default User;
