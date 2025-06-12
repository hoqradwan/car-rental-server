import express from "express";
import { adminMiddleware } from "../../middlewares/auth";
import { allBookings, createBooking, myBookings, cancelManualBooking, cancelRequestForBooking, cancelBooking, getBookingsByDate, createManualBooking, allManualBookings } from "./booking.controller";
import upload from "../../middlewares/fileUploadNormal";

const router = express.Router();

router.post(
    "/",
    adminMiddleware("admin", "employee", "user"),
    upload.single("driverLicense"),
    createBooking
);
router.post(
    "/manual",
    adminMiddleware("admin", "employee"),
    createManualBooking
);
router.post(
    "/cancelManualBooking",
    adminMiddleware("admin", "employee"),
    cancelManualBooking
);
router.get(
    "/manual",
    adminMiddleware("admin", "employee"),
    allManualBookings
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
router.get("/bookingsByDate",adminMiddleware("admin","employee"),getBookingsByDate)

export const BookingRoutes = router;