import express from "express";
import { adminMiddleware } from "../../middlewares/auth";
import { addCar } from "./car.controller";
import upload from "../../middlewares/fileUploadNormal";

const router = express.Router();

router.post(
    "/", 
    adminMiddleware("admin"),
    upload.single("image"),
    addCar);

export const CarRoutes = router;