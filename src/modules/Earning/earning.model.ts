import { Schema, model, Document } from 'mongoose';
import { IEarning } from './earning.interface';



const EarningSchema = new Schema<IEarning>(
    {
        totalBalance: { type: Number, required: true , default : 0},
        totalProfit: { type: Number, required: true, default : 0 },
        type : {type : String, required : true, default : "admin"}
    },
    {
        timestamps: true,
    }
);

export const Earning = model<IEarning>('Earning', EarningSchema);