import express from "express";
import { create, getUserById, getAllUsers, update, deleteUser } from "../controller/userController.js";

const route = express.Router();

route.post("/user",create);
route.get("/get/users",getAllUsers);
route.get("/get/user/:id",getUserById);
route.put("/update/user/:id",update);
route.delete("/delete/user/:id",deleteUser);

export default route;