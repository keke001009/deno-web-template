import { Database, DataTypes, env, Model } from "./deps.ts";
import {
  FieldValue,
  Values,
} from "https://deno.land/x/denodb@v1.0.40/lib/data-types.ts";
import { validate } from "validasaur";
import Post from "/domain/entities/Post.ts";
import Comment from "/domain/entities/Comment.ts";
import { Relationships } from "denodb";
/**
 * mysql
 */
const db = new Database(
  {
    dialect: "mysql",
  },
  {
    host: env.DB_HOST,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
  },
);

// await db.sync({ drop : true });
Relationships.belongsTo(Comment, Post);

db.link([Post, Comment]);

const create = Model.create;
const deleteById = Model.deleteById;
const save = Model.prototype.save;
const update = Model.prototype.update;
function getValue(self: any): Values {
  const model: any = self.constructor;
  const values: Values = {};
  const fields = model.fields;
  if (model) {
    for (const field of Object.keys(fields)) {
      if (self?.[field]) {
        values[field] = (self as any)[field];
      }
    }
  }
  return values;
}

Model.create = async function (
  values: Values | Values[],
): Promise<any | any[]> {
  const insertions = Array.isArray(values) ? values : [values];
  insertions.some(async (value) => {
    const model = this.constructor as any;
    const rules = model?.rules?.create;
    rules && await validate(value, rules);
  });
  return await create.call(this, values as any);
};

Model.prototype.save = async function (): Promise<any> {
  const values = getValue(this);
  const model = this.constructor as any;
  const rules = model?.rules?.save;
  rules && await validate(values, rules);
  return await save.call(this);
};

Model.prototype.update = async function (): Promise<any> {
  const values = getValue(this);
  const model = this.constructor as any;
  const rules = model?.rules?.update;
  rules && await validate(values, rules);
  return await update.call(this);
};

Model.deleteById = async function (id: FieldValue): Promise<any> {
  const self = this as any;
  console.error(self);
  if (self?.fields?.delYn?.type == "string") {
    const item = await self.find.call(self, id);
    item.delYn = "Y";
    item.updated_at = new Date();
    return await item.update();
  }
  return await deleteById.call(self, id);
};

export default db;
