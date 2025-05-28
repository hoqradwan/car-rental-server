import express from "express";
import { adminMiddleware } from "../../middlewares/auth";
import { addCar, getCars } from "./car.controller";
import upload from "../../middlewares/fileUploadNormal";

const router = express.Router();

router.post(
    "/", 
    adminMiddleware("admin"),
    upload.single("image"),
    addCar);
router.get(
    "/", 
    adminMiddleware("admin","user"),
    getCars);

export const CarRoutes = router;