import { Type } from "class-transformer";
import { Equals, IsEnum, isNotEmpty, IsNotEmpty, ValidateNested } from "class-validator";
import { ObjectId } from "mongoose";
import { MealTime } from "../enums/menus-mealtime.enum";

export class TagDto {
    @IsNotEmpty()
    id:string;

    @IsNotEmpty()
    name:string;
}

export class CreateMenuDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    // @ValidateNested({each: true})
    // @Type(() =>)
    categories: [];

    @IsNotEmpty()
    // @ValidateNested({each: true})
    // @Type(() => TagDto)
    allergies: [];

    @IsNotEmpty()
    @IsEnum(MealTime)
    mealTime:string;
}

export class CreateMenuListDto {
    @ValidateNested({each: true})
    @Type(() => CreateMenuDto)
    menus: CreateMenuDto[];
}