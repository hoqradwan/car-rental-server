import catchAsync from "../../utils/catchAsync";
import { CustomRequest } from "../../utils/CustomRequest";
import sendResponse from "../../utils/sendResponse";
import { addCarIntoDB } from "./car.service";

export const addCar = catchAsync(async (req: CustomRequest, res) => {
    const { id: userId } = req.user; // Assuming req.user contains the authenticated user's info
    const formattedCarData = JSON.parse(req.body.data);
    const result = await addCarIntoDB(userId, formattedCarData, req.body.image); // Assuming addCarIntoDB is a function that handles the DB logic
    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Car added successfully",
        data: result,
    })
})