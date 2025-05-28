import catchAsync from "../../utils/catchAsync";
import { CustomRequest } from "../../utils/CustomRequest";
import sendResponse from "../../utils/sendResponse";
import { addCarIntoDB, getCarsFromDB } from "./car.service";

export const addCar = catchAsync(async (req: CustomRequest, res) => {
 
    const { id: userId } = req.user; 
    const formattedCarData = JSON.parse(req.body.data);
    console.log("Formatted Car Data:", formattedCarData);
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
    const cars = await getCarsFromDB(userId,carData); 
    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Cars retrieved successfully",
        data: cars,
    })
})
