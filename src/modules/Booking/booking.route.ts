import express from "express";
import { adminMiddleware } from "../../middlewares/auth";
import { allBookings, createBooking, myBookings, cancelRequest } from "./booking.controller";
import upload from "../../middlewares/fileUploadNormal";

const router = express.Router();

router.post(
    "/",
    adminMiddleware("admin", "employee", "user"),
    upload.single("driverLicense"),
    createBooking
);
router.get(
    "/myBookings",
    adminMiddleware("user"),
    myBookings
);
router.get(
    "/all",
    adminMiddleware("admin", "employee"),
    allBookings
);
router.post(
    "/cancelRequest/:bookingId",
    adminMiddleware("user"),
    cancelRequest
);

export const BookingRoutes = router;