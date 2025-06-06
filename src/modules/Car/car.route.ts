import express from "express";
import { adminMiddleware } from "../../middlewares/auth";
import { addCar, getCars, deleteCar, changeCarStatus } from "./car.controller";
import upload from "../../middlewares/fileUploadNormal";

const router = express.Router();

router.post(
    "/", 
    adminMiddleware("admin"),
    upload.single("image"),
    addCar);
router.get(
    "/", 
    adminMiddleware("admin","employee","user"),
    getCars);
router.post(
    "/:carId", 
    adminMiddleware("admin","employee"),
    deleteCar);
router.post(
    "/changeStatus/:carId", 
    adminMiddleware("admin","employee"),
    changeCarStatus);

export const CarRoutes = router;