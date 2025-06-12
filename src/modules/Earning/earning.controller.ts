import catchAsync from "../../utils/catchAsync";
import { CustomRequest } from "../../utils/CustomRequest";
import sendResponse from "../../utils/sendResponse";
import { createDashboardIntoDB, getOverviewFromDB } from "./earning.service";

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
export const createDashboard = catchAsync(async (req: CustomRequest, res) => {
    const { id: userId } = req.user;
    const dashData = req.body;
    const result = await createDashboardIntoDB(dashData);
    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Dashboard created successfully",
        data: result,
    })
})