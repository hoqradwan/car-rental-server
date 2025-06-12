import { Schema, model, Document, Types } from 'mongoose';
import { IBooking } from './booking.interface';

const BookingSchema = new Schema<IBooking>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
    pickupDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date, required: true },
    driverLicense: { type: String, required: true },
    licenseNo: { type: String, required: true },
    bookingType: { type: String, enum: ["online", "manual"], required: true, default: "online" },
    status: {
        type: String,
        required: true,
        enum: ['booked', 'ongoing', 'completed', 'cancelRequest', 'cancelled']
    },
}, {
    timestamps: true,
});

export const Booking = model<IBooking>('Booking', BookingSchema);
