import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { TermsRoutes } from "../modules/Terms/Terms.route";
import { AboutRoutes } from "../modules/About/About.route";
import { PrivacyRoutes } from "../modules/privacy/Privacy.route";
import { NotificationRoutes } from "../modules/notifications/notification.route";
import { CarRoutes } from "../modules/Car/car.route";

const router = express.Router();

router.use("/api/v1/user", UserRoutes);
router.use("/api/v1/car", CarRoutes);
router.use("/api/v1/terms", TermsRoutes);
router.use("/api/v1/about", AboutRoutes);
router.use("/api/v1/privacy", PrivacyRoutes);
router.use("/api/v1/notification", NotificationRoutes);

export default router;
