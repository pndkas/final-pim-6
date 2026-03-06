import createError from "http-errors";
import bcrypt from "bcrypt";
import {
  createDocByUser,
  createUserByUser,
  findDocByUser,
  findUserByUser,
} from "../services/auth.service.js";
import { createDocToken, createUserToken } from "../utils/jwt.js";

// Register DOC&USER
export async function rgtDoctor(req, res, next) {
  const { username, password, specialization } = req.body;
  try {
    const userDoctor = await findDocByUser(username);
    if (userDoctor) {
      throw createError(400, "มีอยู่ในระบบแล้ว");
    }
    const hashPassword = await bcrypt.hash(password, 5);
    console.log("hashPassword", hashPassword);
    const newUserDoctor = await createDocByUser(
      username,
      hashPassword,
      specialization,
    );
    res.status(201).json({
      success: true,
      message: "หมอสมัครแล้วจ้า",
      user: {
        id: newUserDoctor.id,
        username: newUserDoctor.username,
        specialization: newUserDoctor.specialization,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function rgtUser(req, res, next) {
  const { username, password } = req.body;
  try {
    const user = await findUserByUser(username);
    if (user) {
      throw createError(400, "มีอยู่ในระบบแล้ว");
    }
    const hashPassword = await bcrypt.hash(password, 5);
    console.log("hashPassword", hashPassword);
    const newUser = await createUserByUser(username, hashPassword);
    res.status(201).json({
      success: true,
      message: "คนไข้สมัครแล้วจ้า",
      user: {
        id: newUser.id,
        username: newUser.username,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Login DOC&USER
export async function loginDoc(req, res, next) {
  const { username, password } = req.body;
  try {
    const userDoctor = await findDocByUser(username);
    const isMatchDoc = await bcrypt.compare(password, userDoctor.password);
    if (!userDoctor || !isMatchDoc) {
      throw createError(401, "หมอล็อคอินอยู่แล้ว");
    }
    const token = await createDocToken(userDoctor);
    res.status(201).json({
      success: true,
      token: token,
      user: {
        id: userDoctor.id,
        username: userDoctor.username,
        specialization: userDoctor.specialization,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function loginUser(req, res, next) {
  const { username, password } = req.body;
  try {
    const user = await findUserByUser(username);
    // console.log("user", user);
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log("isMatch", isMatch);
    if (!user || !isMatch) {
      throw createError(401, "ยูสเซอร์ล็อคอินอยู่แล้ว");
    }
    const token = await createUserToken(user);
    res.status(201).json({
      success: true,
      token: token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    next(error);
  }
}
