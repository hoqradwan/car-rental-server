import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { CustomRequest } from "../../utils/CustomRequest";
import sendError from "../../utils/sendError";
import sendResponse from "../../utils/sendResponse";
import { addCarIntoDB, getCarsFromDB, deleteCarFromDB, changeCarStatusIntoDB } from "./car.service";
import { UserModel } from "../user/user.model";
import { Response } from "express";
import { Car } from "./car.model";

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

export const setCarLocationToTrack = catchAsync(async (req: CustomRequest, res: Response) => {
  const { lat, lng } = req.body;  // Ensure that lat and lng are passed correctly in the body
  const { id: userId } = req.user;  // Get user ID from the authenticated user
  const {carId} = req.params;
  const user = await UserModel.findById(userId);  // Find the user by ID
  if (!user) {
    throw new Error ("user not found");
  }
  const car = await Car.findById(carId);
  // Correct the coordinates array to only contain two values
  // Make sure the order is correct: [longitude, latitude]
  user.location.coordinates = [lng, lat];  // Ensure lng is the first and lat is the second value

  // Save the updated user object
  const result = await car?.save();

  // Send a success response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car location updated successfully.",
    data: result,
  });
});