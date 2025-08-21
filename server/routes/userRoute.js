import express from "express";
import { create, getUserById, getAllUsers, update } from "../controller/userController.js";

const route = express.Router();

route.post("/user",create);
route.get("/getusers",getAllUsers);
route.get("/getuser/:id",getUserById);
route.put("/updateuser/:id",update);

export default route;