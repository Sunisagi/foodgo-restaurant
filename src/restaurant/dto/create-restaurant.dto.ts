import { IsNotEmpty, Length } from "class-validator";

export class CreateRestaurantDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    lat: string;

    @IsNotEmpty()
    long: string;
}