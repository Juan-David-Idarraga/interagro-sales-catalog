import { scryptSync, timingSafeEqual } from "node:crypto";

export function verifyPassword(password: string, storedHash: string | undefined): boolean {
  if (!storedHash) return false;

  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;

  const actual = Buffer.from(hash, "hex");
  const expected = scryptSync(password, salt, actual.length);

  if (actual.length !== expected.length) return false;
  return timingSafeEqual(actual, expected);
}
