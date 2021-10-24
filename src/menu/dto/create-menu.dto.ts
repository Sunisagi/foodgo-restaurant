import { Type } from "class-transformer";
import { Equals, IsEnum, isNotEmpty, IsNotEmpty, ValidateNested } from "class-validator";
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
    @ValidateNested({each: true})
    @Type(() => TagDto)
    categories: TagDto[];

    @IsNotEmpty()
    @ValidateNested({each: true})
    @Type(() => TagDto)
    allergies: TagDto[];

    @IsNotEmpty()
    @IsEnum(MealTime)
    mealTime:string;
}

export class CreateMenuListDto {
    @ValidateNested({each: true})
    @Type(() => CreateMenuDto)
    menus: CreateMenuDto[];
}