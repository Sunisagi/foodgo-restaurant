import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Logger } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { info } from 'console';
import { Restaurant } from './schemas/restaurant.schema';

@Controller('')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) { }

    @Get(':ownerId/information')
    find(@Param('ownerId') ownerId: string): Promise<Restaurant> {
        const restaurant = this.restaurantService.find(ownerId);
        return restaurant;
    }

    @Post(':ownerId/information')
    Create(@Param('ownerId') ownerId:string, @Body() body:CreateRestaurantDto): Promise<Restaurant> {    
        body['ownerId'] = ownerId;
        const restaurant = this.restaurantService.create(body);
        return restaurant
        
    }
}
