import { UserModel } from "../user/user.model";
import { ICar } from "./car.interface";
import { Car } from "./car.model";

export const addCarIntoDB = async (userId: string, carData: ICar, image: string) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const result = await Car.create({ ...carData, image })
    return result;
}

export const getCarsFromDB = async (userId: string, carData: Partial<ICar>) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const searchQuery: any = {};
    if (carData?.make) {
        searchQuery.make = { $regex: carData.make, $options: "i" };
    }
    if (carData?.model) {
        searchQuery.model = { $regex: carData.model, $options: "i" };
    }
    if (user.role === "user") {
        const cars = await Car.find({ ...searchQuery, status: "available" }).sort({ createdAt: -1 });
        return cars;
    }
    if (user.role === "admin" || user.role === "employee") {
        const cars = await Car.find(searchQuery).sort({ createdAt: -1 });
        return cars;
    }
}

export const deleteCarFromDB = async (userId: string, carId: string) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    // const car = await Car.findById(carId);
    // if (!car) {
    //     throw new Error("Car not found");
    // }
    const deletedCar = await Car.findByIdAndDelete(
        carId
    )
    if (!deletedCar) {
        throw new Error("Car deletion unsuccessful");
    }
    return deletedCar
}
export const changeCarStatusIntoDB = async (userId: string, carId: string, status: string) => {
    if(!status){
        throw new Error("Please provide the status to update");
    }
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    const updateCar = await Car.findByIdAndUpdate(
        carId,
        { status },
        { new: true }
    )
    if (!updateCar) {
        throw new Error("Car update unsuccessful");
    }
    return updateCar
}
/*


{
  "make": "Toyota",
  "model": "Premio",
  "color": "Black",
  "licensePlate": "ABC4321",
  "vin": "1HGBH41JXMN109187",
  "doors": 4,
  "camera": 1,
  "bluetooth": 1,
  "description": "A reliable and fuel-efficient car, perfect for city driving.",
  "price": 25000,
  "seats": 5,
  "tax": 150,
  "status": "available"
}

*/