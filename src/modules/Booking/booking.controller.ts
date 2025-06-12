import { Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CustomRequest } from "../../utils/CustomRequest";
import { addBookingIntoDB, addManualBookingIntoDB, cancelBookingIntoDB, cancelRequestForBookingIntoDB, getAllBookingsFromDB, getAllManualBookingsFromDB, getBookingsByDateFromDB, getMyBookingsFromDB } from "./booking.service";

export const createBooking = catchAsync(async (req: CustomRequest, res: Response) => {
    const { id: userId } = req.user; // Extract user ID from the request
    // solved after receiving req.body.data and then formatting it. then accessing the objects inside data object bookingData paymentData
    const formattedData = JSON.parse(req.body.data); // Parse booking data from request body
    const result = await addBookingIntoDB(userId, formattedData.bookingData, formattedData.paymentData, req.body.driverLicense); // Call service to add booking into DB
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking created successfully",
        data: result, // Replace with actual booking data if available
    });
})
export const createManualBooking = catchAsync(async (req: CustomRequest, res: Response) => {
    const { id: userId } = req.user; // Extract user ID from the request
    const bookingData = req.body;
    // solved after receiving req.body.data and then formatting it. then accessing the objects inside data object bookingData paymentData
    const result = await addManualBookingIntoDB(userId, bookingData); // Call service to add booking into DB
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Manual booking created successfully",
        data: result, 
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
export const allManualBookings = catchAsync(async (req: CustomRequest, res: Response) => {
    const { id: userId } = req.user; // Extract user ID from the request
    const result = await getAllManualBookingsFromDB(userId); // Call service to add booking into DB
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All manual Bookings retrieved successfully",
        data: result, 
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
export const cancelRequestForBooking = catchAsync(async (req: CustomRequest, res: Response) => {
    const { id: userId } = req.user; // Extract user ID from the request
    const {bookingId} = req.params;
    const result = await cancelRequestForBookingIntoDB(userId,bookingId); // Call service to add booking into DB
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Cancel request for booking sent successfully",
        data: result, // Replace with actual booking data if available
    });
})
export const cancelBooking = catchAsync(async (req: CustomRequest, res: Response) => {
    const { id: userId } = req.user; // Extract user ID from the request
    const {bookingId} = req.params;
    const result = await cancelBookingIntoDB(userId,bookingId); // Call service to add booking into DB
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking cancelled successfully",
        data: result, // Replace with actual booking data if available
    });
})
export const getBookingsByDate = catchAsync(async (req: CustomRequest, res: Response) => {
    const { id: userId } = req.user; // Extract user ID from the request
    const date = new Date(req.body.date);
    const result = await getBookingsByDateFromDB(userId, date); // Call service to add booking into DB
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking by date retrieved successfully",
        data: result, // Replace with actual booking data if available
    });
})