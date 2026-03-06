import createError from "http-errors";
import { verifyUserToken } from "../utils/jwt.js";
import { findUserByUser } from "../services/auth.service.js";

export async function authenCheckUser(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw createError(401, "Unauthorized");
    }
    const token = authorization.split(" ")[1];
    const payload = verifyUserToken(token);

    const user = await findUserByUser(payload.username);
    if (!user) {
      throw createError(401, "Unauthorized");
    }

    req.username = user;
    next();
  } catch (error) {
    next(error);
  }
}
