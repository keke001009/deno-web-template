import { DataTypes, Model } from "/deps.ts";
import { isNumber, required, validate } from "validasaur";
import { v4 as uuid } from "https://deno.land/std@0.74.0/uuid/mod.ts";
import Comment from "./Comment.ts";

/**
 * Post
 * @member id pk
 * @member uuid uuid
 * @member username user 아이디
 * @member content content
 */
class Post extends Model {
  static table = "post";
  static timestamps = true;

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    uuid: { type: DataTypes.UUID },
    username: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING },
  };

  static comments() {
    return this.hasMany(Comment);
  }

  static defaults = {
    id: 0,
  };

  static rules = {
    create: {
      username: [required],
      content: [required],
    },
    update: {
      username: [required],
      content: [required],
    },
    save: {
      username: [required],
      content: [required],
    },
  };
  /**
   * 개발용 데이터
   * @generator 샘플 코드
   */
  static async makeSample() {
    const usernames = ["baba", "keke", "box", "rock", "water"];
    const contents = [
      "babaisyou",
      "kekeisyou",
      "boxisme",
      "rockisbaba",
      "waterisdead",
    ];
    const i = Math.ceil(Math.random() * (5 - 1));
    // const post = new Post();
    // post.uuid = uuid.generate();
    // post.username = usernames[i];
    // post.content = contents[i];
    // // console.log(Post);
    // await post.save();
    return await Post.create({
      uuid: uuid.generate(),
      username: usernames[i],
      content: contents[i],
    });
  }
}

export default Post;
