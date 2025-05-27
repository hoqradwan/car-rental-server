import { model, Schema } from "mongoose";

const UserProfileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    drivingLicense: { type: String, default: "" },
    address: { type: String, default: "" },
})

export const UserProfile = model("UserProfile", UserProfileSchema);