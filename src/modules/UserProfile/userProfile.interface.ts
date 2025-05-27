import { ObjectId } from "mongoose";

export interface IUserProfile {
  user: ObjectId;
  firstName: string;
  lastName: string;
  drivingLicense: string;
  address?: string;
}