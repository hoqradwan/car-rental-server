import { Car } from "../Car/car.model";
import { UserModel } from "../user/user.model"
import { Earning } from "./earning.model";

export const getOverviewFromDB = async(userId : string)=>{
    const user  = await UserModel.findById(userId);
    if(!user){
        throw new Error("User not found");
    }
    const totalRentalOuts = await Car.find({status : "rented"}).countDocuments();
    const totalEarnings = await Earning.find({});
}