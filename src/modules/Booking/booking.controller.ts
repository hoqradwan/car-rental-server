import { Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CustomRequest } from "../../utils/CustomRequest";
import { addBookingIntoDB, cancelRequestIntoDB, getAllBookingsFromDB, getMyBookingsFromDB } from "./booking.service";

export const createBooking = catchAsync(async (req: CustomRequest, res: Response) => {
    console.log(req.body.driverLicense)
    const { id: userId } = req.user; // Extract user ID from the request
    const formattedBookingData = JSON.parse(req.body.data); // Parse booking data from request body
    const result = await addBookingIntoDB(userId, formattedBookingData, req.body.driverLicense); // Call service to add booking into DB
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking created successfully",
        data: result, // Replace with actual booking data if available
    });
})
export const myBookings = catchAsync(async (req: CustomRequest, res: Response) => {
    const { id: userId } = req.user; // Extract user ID from the request
    const result = await getMyBookingsFromDB(userId); // Call service to add booking into DB
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "My Bookings retrieved successfully",
        data: result, // Replace with actual booking data if available
    });
})
export const allBookings = catchAsync(async (req: CustomRequest, res: Response) => {
    const { id: userId } = req.user; // Extract user ID from the request
    const result = await getAllBookingsFromDB(userId); // Call service to add booking into DB
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All bookings retrieved successfully",
        data: result, // Replace with actual booking data if available
    });
})
export const cancelRequest = catchAsync(async (req: CustomRequest, res: Response) => {
    const { id: userId } = req.user; // Extract user ID from the request
    const {bookingId} = req.params;
    const result = await cancelRequestIntoDB(userId,bookingId); // Call service to add booking into DB
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Cancel request for booking sent successfully",
        data: result, // Replace with actual booking data if available
    });
})