import { UserModel } from "../user/user.model";
import { ICar } from "./car.interface";
import { Car } from "./car.model";

export const addCarIntoDB = async (userId: string, carData: ICar, image: string) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const result = await Car.create({...carData,image})
    return result;
}