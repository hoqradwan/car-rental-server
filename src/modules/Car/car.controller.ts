import catchAsync from "../../utils/catchAsync";
import { CustomRequest } from "../../utils/CustomRequest";
import sendResponse from "../../utils/sendResponse";
import { addCarIntoDB, getCarsFromDB, deleteCarFromDB, changeCarStatusIntoDB } from "./car.service";

export const addCar = catchAsync(async (req: CustomRequest, res) => {
    const { id: userId } = req.user;
    const formattedCarData = JSON.parse(req.body.data);
    const result = await addCarIntoDB(userId, formattedCarData, req.body.image);
    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Car added successfully",
        data: result,
    })
})

export const getCars = catchAsync(async (req: CustomRequest, res) => {
    const { id: userId } = req.user;
    const carData = req.query;
    const cars = await getCarsFromDB(userId, carData);
    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Cars retrieved successfully",
        data: cars,
    })
})
export const deleteCar = catchAsync(async (req: CustomRequest, res) => {
    const { id: userId } = req.user;
    const { carId } = req.params;
    const cars = await deleteCarFromDB(userId, carId);
    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Cars deleted successfully",
        data: cars,
    })
})
export const changeCarStatus = catchAsync(async (req: CustomRequest, res) => {
    const { id: userId } = req.user;
    const { carId } = req.params;
    const {status} = req.body;
    const cars = await changeCarStatusIntoDB(userId, carId, status);
    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Cars status changed successfully",
        data: cars,
    })
})
