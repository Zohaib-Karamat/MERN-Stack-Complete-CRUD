import express from "express";
import { create, getUserById, getAllUsers } from "../controller/userController.js";

const route = express.Router();

route.post("/user",create);
route.get("/getusers",getAllUsers);
route.get("/getusers/:id",getUserById);

export default route;