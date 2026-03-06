import bcrypt from "bcrypt";
import { editDoc, editUser } from "../services/management.service.js";

export function getUsers(req, res, next) {
  const { id, username } = req.username;
  res.status(200).json({ id, username });
}

export function getDoc(req, res, next) {
  const { id, username } = req.username;
  res.status(200).json({ id, username });
}

export async function editDoctor(req, res, next) {
  const { username, password } = req.body;
  //   console.log("req.user", req.username);
  try {
    const hashPassword = await bcrypt.hash(password, 5);
    await editDoc(username, hashPassword, req.username.id);
    res.status(200).json({ message: "หมออัปเดตแล้วจ้า" });
  } catch (error) {
    next(error);
  }
}

export async function editUserMe(req, res, next) {
  const { username, password } = req.body;
  //   console.log("req.user", req.username);
  try {
    const hashPassword = await bcrypt.hash(password, 5);
    await editUser(username, hashPassword, req.username.id);
    res.status(200).json({ message: "คนไข้อัปเดตแล้วจ้า" });
  } catch (error) {
    next(error);
  }
}
