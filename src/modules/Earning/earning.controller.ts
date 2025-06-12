import catchAsync from "../../utils/catchAsync";
import { CustomRequest } from "../../utils/CustomRequest";
import sendResponse from "../../utils/sendResponse";
import { getOverviewFromDB } from "./earning.service";

export const getOverview = catchAsync(async (req: CustomRequest, res) => {
    const { id: userId } = req.user;
    const result = await getOverviewFromDB(userId);
    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Overview retrieved successfully",
        data: result,
    })
})