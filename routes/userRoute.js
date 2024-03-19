import express from "express";
import {  userLogin,userRegister,fetchDirection,} from "../Controllers/userController.js";


const router = express.Router();

router.post("/login", userLogin);
router.post("/register", validateRequest, userRegister);

export default router;