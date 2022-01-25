import { createJWT, decodeJWT } from "/lib/jwt.ts";
import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.122.0/testing/asserts.ts";
const test_payload = { foo: "bar" };

Deno.test("JWT 토큰 생성", async () => {
  const jwt = await createJWT(test_payload);
  assert(jwt);
  assertEquals(
    jwt,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIifQ.I3zyt8k5JKmG-Tf2giFBIEEAkpODObapsmSigKPQTP8",
  );
});

Deno.test("JWT 디코드", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIifQ.I3zyt8k5JKmG-Tf2giFBIEEAkpODObapsmSigKPQTP8";
  const { header, payload, signature } = decodeJWT(token);
  assert(header);
  assertEquals(payload, test_payload);
});
