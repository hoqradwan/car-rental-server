import { Schema, model, Document } from 'mongoose';
import { IEarning } from './earning.interface';



const EarningSchema = new Schema<IEarning>(
    {
        totalBalance: { type: Number, required: true },
        totalProfit: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

export const Earning = model<IEarning>('Earning', EarningSchema);