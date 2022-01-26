import { isEmail, isNumber, required, validate } from "validasaur";
import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.122.0/testing/asserts.ts";

/**
 * https://github.com/emsifa/validasaur
 */
Deno.test("validasaur 테스트", async () => {
  const inputs = {
    name: "test",
    age: "20",
  };

  const schema = {
    name: required,
    age: [required, isNumber],
  };
  const [passes, errors] = await validate(inputs, schema);

  assertEquals(passes, false);
  assertEquals(errors, { age: { isNumber: "age must be a number" } });
});

Deno.test("validasour 스키마 병합", async () => {
  const inputs = {
    name: "test",
    age: 20,
  };

  const inputs1 = {
    email: "testemail",
    // email: "test@gmail.com"
  };

  const schema = {
    name: required,
    age: [required, isNumber],
  };
  const schema1 = {
    email: [required, isEmail],
  };
  const [passes, errors] = await validate({ ...inputs, ...inputs1 }, {
    ...schema,
    ...schema1,
  });

  assertEquals(passes, false);
  assertEquals(errors, {
    age: { isNumber: "email is not a valid email address" },
  });
});
