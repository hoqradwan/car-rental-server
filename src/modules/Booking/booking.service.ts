import { Car } from "../Car/car.model";
import { UserModel } from "../user/user.model";
import { IBooking } from "./booking.interface";
import { Booking } from "./booking.model";

export const addBookingIntoDB = async (userId: string, bookingData: IBooking, driverLicense: string) => {
    const { car, pickupDate, returnDate, totalPrice, address, phone, dob, licenseNo } = bookingData;

    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const carExists = await Car.findById(car);
    if (!carExists) {
        throw new Error("Car not found");
    }
    if (carExists.status !== "available") {
        throw new Error("Car is not available for booking");
    }
    if (pickupDate < new Date()) {
        throw new Error("Pickup date cannot be in the past");
    }
    if (pickupDate === returnDate) {
        throw new Error("Pickup date cannot be the same as return date");
    }
    if (new Date(pickupDate) >= new Date(returnDate)) {
        throw new Error("Pickup date must be before return date");
    }

    const booking = {
        user: userId,
        car,
        pickupDate,
        returnDate,
        totalPrice,
        address: user.address || address, // Use user's address if available
        phone: user.phone || phone, // Use user's phone if available
        dob: user.dob || dob,
        driverLicense: driverLicense,
        licenseNo,
        status: "booked",
    };
    const result = await Booking.create(booking);
    return result;
}

export const getMyBookingsFromDB = async (userId: string) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const bookings = await Booking.find({ user: userId });
    return bookings;
}
export const getAllBookingsFromDB = async (userId: string) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const bookings = await Booking.find();
    return bookings;
}
export const cancelRequestIntoDB = async (userId: string, bookingId: string) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const bookingExists = await Booking.findById(bookingId);
    if (!bookingExists) {
        throw new Error("Booking not found");
    }
    if (bookingExists.status === 'ongoing') {
        throw new Error("Cannot cancel a ongoing booking")
    }
    if (bookingExists.user.toString() !== userId) {
        throw new Error("User not authorized to cancel this booking");
    }

    const cancelRequestForBooking = await Booking.findByIdAndUpdate(bookingExists._id, {
        status: "cancelRequest"
    }, { new: true });
    return cancelRequestForBooking;
}

/* 
// Parse the JSON response body
let response = pm.response.json();
 
// Check if the response code is 200 (Login Successful)
if (response.statusCode === 200) {
    // Extract the access token
    let accessToken = response.data.token;
   
    // Set the access token in a global variable
    pm.globals.set("userAccessToken", accessToken);
   
    console.log("Access token set in global variable: userAccessToken");
} else {
    console.log("Login failed: " + response.message);
}
*/