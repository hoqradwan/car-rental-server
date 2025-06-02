export interface IEarning extends Document {
    user: string;
    totalBalance: number;
    totalProfit: number;
    description?: string;

}