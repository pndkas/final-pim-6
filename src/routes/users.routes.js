import express from "express";
import {
  editDoctor,
  editUserMe,
  getDoc,
  getUsers,
} from "../controllers/management.controller.js";
import {
  authenCheckDoc,
  authenCheckUser,
} from "../middlewares/authen.middleware.js";

const dataRoute = express.Router();

dataRoute.get("/users/me", authenCheckUser, getUsers);
dataRoute.put("/users/me", authenCheckUser, editUserMe);

dataRoute.get("/doctors/me", authenCheckDoc, getDoc);
dataRoute.put("/doctors/me", authenCheckDoc, editDoctor);

export default dataRoute;
