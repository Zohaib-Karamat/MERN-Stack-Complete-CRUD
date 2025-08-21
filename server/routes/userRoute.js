import express from "express";
import { create } from "../controller/userController.js";
import { getAllUsers } from "../controller/userController.js";

const route = express.Router();

route.post("/user",create);
route.get("/getusers",getAllUsers);

export default route;