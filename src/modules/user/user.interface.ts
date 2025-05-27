import { Document } from "mongoose";

export type IPendingUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "user" | "admin";
} & Document;

export type IUser = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: "admin" | "user";
  isDeleted: boolean;
} & Document;

export type IOTP = {
  email: string;
  otp: string;
  expiresAt: Date;
} & Document;
