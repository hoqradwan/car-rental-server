export interface ICar {
    image: string;
    make: string;
    model: string;
    color: string;
    licensePlate: string;
    vin: string;
    doors: number;
    camera?: number;
    bluetooth?: number;
    description?: string;
    price: number;
    seats: number;
    tax?: number;
    status?: "available" | "rented" | "maintenance";
    createdAt?: Date;
    updatedAt?: Date;
}