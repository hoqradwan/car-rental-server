import mongoose from "mongoose";
import { Car } from "../Car/car.model";
import { IPayment } from "../payment/payment.interface";
import { PaymentModel } from "../payment/payment.model";
import { UserModel } from "../user/user.model";
import { IBooking } from "./booking.interface";
import { Booking } from "./booking.model";
export const addBookingIntoDB = async (
    userId: string,
    bookingData: IBooking,
    paymentData: IPayment, // Added payment data
    driverLicense: string,
) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { car, pickupDate, returnDate, address, phone, dob, licenseNo } = bookingData;

        // Fetch User and Car
        const user = await UserModel.findById(userId).session(session);
        if (!user) {
            throw new Error('User not found');
        }

        const carExists = await Car.findById(car).session(session);
        if (!carExists) {
            throw new Error('Car not found');
        }

        if (carExists.status !== 'available') {
            throw new Error('Car is not available for booking');
        }
       await Car.findByIdAndUpdate(
            carExists._id,
            { status: "rented" },
            { new: true }
        )
        // Date validation
        const pickup = new Date(pickupDate);
        const returnD = new Date(returnDate);

        if (pickup < new Date()) {
            throw new Error('Pickup date cannot be in the past');
        }

        if (pickup.getTime() === returnD.getTime()) {
            throw new Error('Pickup date cannot be the same as return date');
        }

        if (pickup >= returnD) {
            throw new Error('Pickup date must be before return date');
        }

        // Calculate the number of days between pickupDate and returnDate
        const timeDiff = returnD.getTime() - pickup.getTime(); // time difference in milliseconds
        const dayDiff = timeDiff / (1000 * 3600 * 24); // convert milliseconds to days

        if (isNaN(dayDiff) || dayDiff <= 0) {
            throw new Error('Invalid booking duration');
        }

        // Calculate the total price (daily price * number of days)
        let totalPrice = carExists.price * dayDiff;

        // Apply discount if the booking is 7 days or more
        let discountedPrice = totalPrice;
        if (dayDiff >= 7) {
            discountedPrice = totalPrice - (totalPrice * 0.1); // 10% discount
        }

        // Prepare the booking data
        const booking = {
            user: userId,
            car,
            pickupDate,
            returnDate,
            totalPrice: discountedPrice,
            address: user.address || address, // Use user's address if available
            phone: user.phone || phone, // Use user's phone if available
            dob: user.dob || dob,
            driverLicense,
            licenseNo,
            bookingType : "online",
            status: 'booked',
        };
        // Create the booking
        const createdBooking = await Booking.create([booking], { session });
        if (!createdBooking || createdBooking.length === 0) {
            throw new Error('Booking creation failed');
        }

        // Create the payment data
        const payment = {
            transactionId: paymentData.transactionId,
            user: userId,
            amount: discountedPrice,
            paymentData: paymentData.paymentData,
            status: 'completed', // Assuming the payment is successful
            isDeleted: false,
        };

        // Create the payment record
        const createdPayment = await PaymentModel.create([payment], { session });
        if (!createdPayment || createdPayment.length === 0) {
            throw new Error('Payment creation failed');
        }

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        return {
            booking: createdBooking[0],
            payment: createdPayment[0],
        };
    } catch (error: any) {
        // Abort the transaction in case of an error
        await session.abortTransaction();
        session.endSession();
        throw new Error(`Transaction failed: ${error?.message}`);
    }
};
export const addManualBookingIntoDB = async (
    userId: string,
    bookingData: IBooking,
) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { car, pickupDate, returnDate, address, phone, dob, licenseNo } = bookingData;

        // Fetch User and Car
        const user = await UserModel.findById(userId).session(session);
        if (!user) {
            throw new Error('User not found');
        }

        const carExists = await Car.findById(car).session(session);
        if (!carExists) {
            throw new Error('Car not found');
        }

        if (carExists.status !== 'available') {
            throw new Error('Car is not available for booking');
        }
         await Car.findByIdAndUpdate(
            carExists._id,
            { status: "rented" },
            { new: true }
        )
        // Date validation
        const pickup = new Date(pickupDate);
        const returnD = new Date(returnDate);

        if (pickup < new Date()) {
            throw new Error('Pickup date cannot be in the past');
        }

        if (pickup.getTime() === returnD.getTime()) {
            throw new Error('Pickup date cannot be the same as return date');
        }

        if (pickup >= returnD) {
            throw new Error('Pickup date must be before return date');
        }

        // Calculate the number of days between pickupDate and returnDate
        const timeDiff = returnD.getTime() - pickup.getTime(); // time difference in milliseconds
        const dayDiff = timeDiff / (1000 * 3600 * 24); // convert milliseconds to days

        if (isNaN(dayDiff) || dayDiff <= 0) {
            throw new Error('Invalid booking duration');
        }

        // Calculate the total price (daily price * number of days)
        let totalPrice = carExists.price * dayDiff;

        // Apply discount if the booking is 7 days or more
        let discountedPrice = totalPrice;
        if (dayDiff >= 7) {
            discountedPrice = totalPrice - (totalPrice * 0.1); // 10% discount
        }

        // Prepare the booking data
        const booking = {
            user: userId,
            car,
            pickupDate,
            returnDate,
            totalPrice: discountedPrice,
            address: user.address || address, // Use user's address if available
            phone: user.phone || phone, // Use user's phone if available
            dob: user.dob || dob,
            driverLicense : "abc",
            licenseNo,
            bookingType : "manual",
            status: 'ongoing',
        };
        // Create the booking
        const createdBooking = await Booking.create([booking], { session });
        if (!createdBooking || createdBooking.length === 0) {
            throw new Error('Booking creation failed');
        }

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        return {
            booking: createdBooking[0],
        };
    } catch (error: any) {
        // Abort the transaction in case of an error
        await session.abortTransaction();
        session.endSession();
        throw new Error(`Transaction failed: ${error?.message}`);
    }
};

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
export const getAllManualBookingsFromDB = async (userId: string) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const bookings = await Booking.find({bookingType:"manual"});
    return bookings;
}
export const cancelRequestForBookingIntoDB = async (userId: string, bookingId: string) => {
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
export const cancelBookingIntoDB = async (userId: string, bookingId: string) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const bookingExists = await Booking.findById(bookingId);
    if (!bookingExists) {
        throw new Error("Booking not found");
    }
    if (bookingExists.status !== 'cancelRequest') {
        throw new Error("Cannot cancel a booking without a cancel request")
    }
    const car = await Car.findByIdAndUpdate(bookingExists.car,
        {status : "available"},
        {new: true}
    )
    const cancelBooking = await Booking.findByIdAndUpdate(bookingExists._id, {
        status: "cancelled"
    }, { new: true });
    return cancelBooking;
}
export const getBookingsByDateFromDB = async (userId: string, date: Date) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const bookings = await Booking.find({
        pickupDate: { $lte: endOfDay },
        returnDate: { $gte: startOfDay },
    }).exec();
    return bookings;

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