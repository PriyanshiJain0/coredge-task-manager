import { passwordHash, isValidPass } from "./crypto";
import { userDb } from "./db";
import { User, SignInUser } from "./interfaces";

const sendResponse = (info: any, error?: boolean) => {
  return { ...info, ...(error ? { error: true } : {}) };
};

export const addUser = async ({ password, email, username }: User) => {
  const encrypPass = passwordHash(password);
  const hasUser = await userDb.where("email").equals(email).first();
  if (hasUser) {
    return sendResponse(
      { email: "Error: User with this email alreay exists, please signin." },
      true
    );
  }

  const user = await userDb.add({
    username,
    password: encrypPass,
    email,
  });

  console.log(user);

  return sendResponse({ email, username });
};

export const signInUser = async ({ password, email }: SignInUser) => {
  const hasUser = await userDb.where("email").equals(email).first();

  if (!hasUser) {
    return sendResponse(
      { email: "Error: User does not exist, please signup." },
      true
    );
  }

  const isValid = isValidPass(password, hasUser.password);

  if (!isValid) {
    return sendResponse({ password: "Error: invalid password." }, true);
  }

  const user = { email: hasUser.email, username: hasUser.username };
  return sendResponse(user);
};
