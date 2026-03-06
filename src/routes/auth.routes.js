import express from "express";
import {
  loginDoc,
  loginUser,
  rgtDoctor,
  rgtUser,
} from "../controllers/auth.controller.js";

const authRoute = express.Router();

authRoute.post("/register/doctor", rgtDoctor);
authRoute.post("/login/doctor", loginDoc);

authRoute.post("/register/user", rgtUser);
authRoute.post("/login/user", loginUser);

export default authRoute;
