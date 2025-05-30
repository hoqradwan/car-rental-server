import { model, Schema } from "mongoose";

const carSchema = new Schema({
    image: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String, required: true },
    licensePlate: { type: String, required: true, unique: true },
    vin: { type: String, required: true, unique: true },
    doors: { type: Number, required: true, default: 4 },
    camera: { type: Number, default: 1 },
    bluetooth: { type: Number, default: 1 },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    seats: { type: Number, required: true },
    tax : { type: Number, default: 0 },
    status: {
        type: String,
        enum: ["available", "rented", "maintenance"],
        default: "available",
    }
}, {
    timestamps: true,
})

export const Car = model("Car", carSchema);