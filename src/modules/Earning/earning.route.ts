import express from "express";
import { adminMiddleware } from "../../middlewares/auth";
import { createDashboard, getOverview } from "./earning.controller";
const router = express.Router();
router.get('/overview',adminMiddleware("admin"),getOverview);
router.post('/',adminMiddleware("admin"),createDashboard);

export const DashboardRoutes = router;