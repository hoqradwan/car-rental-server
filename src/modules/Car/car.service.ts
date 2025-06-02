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
    if (user.role === "admin"|| user.role === "employee") {
        const cars = await Car.find(searchQuery).sort({ createdAt: -1 });
        return cars;
    }
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