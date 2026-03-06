import express from "express";
import { getUsers } from "../controllers/management.controller.js";
import { authenCheckUser } from "../middlewares/authen.middleware.js";

const dataRoute = express.Router();

dataRoute.get("/users/me", authenCheckUser, getUsers);
// dataRoute.put("/users/me", );

// dataRoute.get("/doctors/me", );
// dataRoute.get("/doctors/me", );

export default dataRoute;
