import catchAsync from "../../utils/catchAsync";
import { CustomRequest } from "../../utils/CustomRequest";
import sendResponse from "../../utils/sendResponse";
import { addCarIntoDB } from "./car.service";

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

/* 

{
  "make": "Toyota",
  "model": "Corolla",
  "color": "Blue",
  "licensePlate": "ABC1234",
  "vin": "1HGBH41JXMN109186",
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