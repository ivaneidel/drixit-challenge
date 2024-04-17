const jwt = require("jsonwebtoken");

const generateJWTToken = (userId: string) => {
  const secret = process.env.JWT_SECRET;

  const token = jwt.sign({ id: userId }, secret, { expiresIn: "3h" });

  return token;
};

export { generateJWTToken };
