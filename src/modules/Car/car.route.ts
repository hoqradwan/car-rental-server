import express from "express";
import { adminMiddleware } from "../../middlewares/auth";
import { addCar } from "./car.controller";

const router = express.Router();

router.post("/", adminMiddleware("admin"),addCar);

export const CarRoutes = router;