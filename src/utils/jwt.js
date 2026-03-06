import jwt from "jsonwebtoken";

// create
export async function createDocToken(userDoctor) {
  const payload = {
    id: userDoctor.id,
    username: userDoctor.username,
    specialization: userDoctor.specialization,
  };
  const token = jwt.sign(payload, process.env.DOC_SECRET, {
    algorithm: "HS256",
    expiresIn: "7d",
  });
  return token;
}

export async function createUserToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
  };
  const token = jwt.sign(payload, process.env.USER_SECRET, {
    algorithm: "HS256",
    expiresIn: "7d",
  });
  return token;
}

// verify
export function verifyDocToken(token) {
  const payload = jwt.verify(token, process.env.DOC_SECRET, {
    algorithm: ["HS256"],
  });
  return payload;
}

export function verifyUserToken(token) {
  const payload = jwt.verify(token, process.env.USER_SECRET, {
    algorithm: ["HS256"],
  });
  return payload;
}
