import createError from "http-errors";
import { verifyDocToken, verifyUserToken } from "../utils/jwt.js";
import { findDocByUser, findUserByUser } from "../services/auth.service.js";

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

export async function authenCheckDoc(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw createError(401, "Unauthorized");
    }
    const token = authorization.split(" ")[1];
    // console.log("token", token);
    const payload = verifyDocToken(token);

    const doc = await findDocByUser(payload.username);
    if (!doc) {
      throw createError(401, "Unauthorized");
    }

    req.username = doc;
    next();
  } catch (error) {
    next(error);
  }
}
