import { Booking } from "../Booking/booking.model";
import { Car } from "../Car/car.model";
import { UserModel } from "../user/user.model"
import { IEarning } from "./earning.interface";
import { Earning } from "./earning.model";

export const getOverviewFromDB = async (userId: string) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    // Get total rental outs (ongoing rentals)
    const totalRentalOuts = await Booking.find({
        car: { $in: await Car.find({ status: 'rented' }).distinct('_id') },  // Find rented cars
        pickupDate: { $lte: new Date() }, // Pickup date has passed
        returnDate: { $gte: new Date() }, // Return date is in the future
        status: "ongoing"
    }).countDocuments();
    // Get total scheduled pickups (future bookings that are rented)
    const totalScheduledPickups = await Booking.find({
        car: { $in: await Car.find({ status: '' }).distinct('_id') },  // Find rented cars
        pickupDate: { $gte: new Date() }, // Pickup date is in the future
    }).countDocuments();

    // Get total earnings (admin's balance)
    const totalEarnings = await Earning.findOne({ type: "admin" });

    return {
        totalBalance: totalEarnings?.totalBalance ?? 0,  // Handle null case
        totalRentalOuts,
        totalScheduledPickups
    };
};


// export const getOverviewFromDB = async (userId: string) => {
//     const user = await UserModel.findById(userId);
//     if (!user) {
//         throw new Error("User not found");
//     }
//     const totalRentalOuts = await Car.find({
//         status: 'rented',
//         pickupDate: { $lte: new Date() }, // Pickup date has passed
//         returnDate: { $gte: new Date() }
//     }).countDocuments();
//         const totalScheduledPickups = await Car.find({
//         status: 'rented',
//         pickupDate: { $gte: new Date() }, // Pickup date is in the future
//     }).countDocuments();
//     const totalEarnings = await Earning.findOne({ type: "admin" });
//     return {
//         totalBalance: totalEarnings?.totalBalance,
//         totalRentalOuts,
//         totalScheduledPickups
//     }
// }

export const createDashboardIntoDB = async (dashData: IEarning) => {
    const dash = await Earning.create(dashData);
    return dash;
}