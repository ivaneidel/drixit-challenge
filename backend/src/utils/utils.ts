import { randomInt } from "crypto";

const generateRandomString = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = randomInt(0, characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
};

export { generateRandomString };
