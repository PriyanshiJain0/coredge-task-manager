import { genSaltSync, hashSync, compareSync } from "bcryptjs";

const salt = genSaltSync(10);

export const passwordHash = (pass: string): string => {
  return hashSync(pass, salt);
};

export const isValidPass = (pass: string, hashPass: string): boolean => {
  return compareSync(pass, hashPass);
};
