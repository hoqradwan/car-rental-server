import { Types } from "mongoose";

export interface IBooking extends Document {
    user: Types.ObjectId;
    car: Types.ObjectId;
    pickupDate: Date;
    returnDate: Date;
    totalPrice: number;
    address: string;
    phone: string;
    dob: Date;
    driverLicense: string;
    licenseNo: string;
    status: "booked" | "ongoing" | "cancelled" | "cancelRequest" | "completed";
}
