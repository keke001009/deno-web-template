import { create, decode, env, Header, Payload, verify } from "/deps.ts";

const keyBuf: Uint8Array = new TextEncoder().encode(
  env.JWT_SECRET || "testtoken123!@#",
);
const key = await crypto.subtle.importKey(
  "raw",
  keyBuf,
  { name: "HMAC", hash: "SHA-256" },
  true,
  ["sign", "verify"],
);
const algorithm = "HS256";
const header: Header = {
  alg: algorithm,
  typ: "JWT",
};

export const createJWT = async (payload: Payload) => {
  return await create(header, payload, key);
};

export const verifyJWT = async (token: string) => {
  return await verify(token, key);
};

export const decodeJWT = (token: string) => {
  const [header, payload, signature] = decode(token);
  return {
    header,
    payload,
    signature,
  };
};
