import express from "express";
import { adminMiddleware } from "../../middlewares/auth";
import { getOverview } from "./earning.controller";
const router = express.Router();
router.get('/overview',adminMiddleware("admin"),getOverview)

export const EarningRoutes = router;