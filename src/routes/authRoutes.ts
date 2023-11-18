import {
  currentUserController,
  loginController,
  logoutController,
  registerController,
} from "../controllers/authControllers";
import { Router } from "express";
import isAuth from "../middleware/isAuth";

const authRoutes = Router();

authRoutes.post("/v1/register", registerController);
authRoutes.post("/v1/login", loginController);
authRoutes.get("/v1/current-user", isAuth(), currentUserController);
authRoutes.get("/v1/logout", isAuth(["logout"]), logoutController);

export default authRoutes;
