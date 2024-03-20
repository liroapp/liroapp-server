import express from "express";
import {  userLogin,userRegister,fetchDirection} from "../controllers/userController.js";
import validation from "../middlewares/validation.js";

const router = express.Router();

router.post("/login", userLogin);
router.post("/register", validation, userRegister);
router.post("/fetch-directions", fetchDirection);

export default router;