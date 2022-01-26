import { Database, env, Model } from "./deps.ts";
import { Values } from "https://deno.land/x/denodb@v1.0.40/lib/data-types.ts";
import { validate } from "validasaur";
import Post from "/domain/entities/Post.ts";

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

db.link([Post]);

const create = Model.create;
const save = Model.prototype.save;
const update = Model.prototype.update;
function getValue(self: any): Values {
  const model: any = self.constructor;
  const values: Values = {};
  const fields = model.schema;
  if (model) {
    for (const field of Object.keys(fields)) {
      if (self?.[field]) {
        values[field] = (self as any)[field];
      }
    }
  }
  return values;
}

Model.create = async function (values: Values | Values[]): Promise<any> {
  const insertions = Array.isArray(values) ? values : [values];
  insertions.some(async (value) => {
    const model = this.constructor as any;
    const rules = model.rules.create;
    await validate(value, rules);
  });
  return await create.call(this, values as any);
};

Model.prototype.save = async function (): Promise<any> {
  const values = getValue(this);
  const model = this.constructor as any;
  const rules = model.rules.save;
  await validate(values, rules);
  return await save.call(this);
};

Model.prototype.update = async function (): Promise<any> {
  const values = getValue(this);
  const model = this.constructor as any;
  const rules = model.rules.update;
  await validate(values, rules);
  return await update.call(this);
};

export default db;
