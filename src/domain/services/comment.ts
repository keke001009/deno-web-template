import { Client } from "https://deno.land/x/mysql@v2.10.1/mod.ts";
import db from "../../db.ts";
import Comment from "/domain/entities/Comment.ts";

export const read = async () => {
  await Comment.all();
};

export const writeComment = async () => {
  return await Comment.create([
    {
      parentId: 6,
      content: "test6",
    },
    {
      parentId: 6,
      content: "test6",
    },
  ]);
  const comment = new Comment();
  comment.parentId = 6;
  comment.content = "test6";
  return await comment.save();
};

export const readComments = async () => {
  const client = db.getClient() as Client;
  const { rows = [] } = await client.execute(`
    select
      a.id
      ,a.content
      ,a.post_id
      ,a.depth
      ,a.group_id
      ,a.parent_id
    from
      comment a
    left join comment b 
    on
      a.parent_id = b.id
    order by a.group_id asc, parent_id asc, depth asc, a.id desc
  `);

  const comments: any[] = rows?.map((row: Comment) => {
    row.comments = [];
    return row;
  }) || [];
  const results = comments.reduce((tmp, item) => {
    if (item.parent_id != 0) {
      if (tmp[tmp.length - 1].id == item.parent_id) {
        tmp[tmp.length - 1].comments.push(item);
      }
    } else {
      tmp.push(item);
    }
    return tmp;
  }, []);

  return results as Comment[];
};

export const deleteById = async (id: number) => {
  await Comment.deleteById(id);
};
