import express from "express";
import { adminMiddleware } from "../../middlewares/auth";
import { allBookings, createBooking, myBookings,  cancelRequestForBooking, cancelBooking } from "./booking.controller";
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
    cancelRequestForBooking
);
router.post(
    "/cancel/:bookingId",
    adminMiddleware("admin","employee"),
    cancelBooking
);

export const BookingRoutes = router;