import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Logger } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { Restaurant } from './schemas/restaurant.schema';
import { EventPattern } from '@nestjs/microservices';

@Controller('')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) { }

    @Get(':ownerId/information')
    find(@Param('ownerId') ownerId: number): Promise<Restaurant> {
        const restaurant = this.restaurantService.find(ownerId);
        return restaurant;
    }

    @Post(':ownerId/information')
    Create(@Param('ownerId') ownerId:number, @Body() body:CreateRestaurantDto): Promise<Restaurant> {    
        const restaurant = this.restaurantService.create(ownerId, body);
        return restaurant       
    }

    @EventPattern('UserCreated')
    handleEvent(payload: { id: number }) {
        return this.restaurantService.createUser(payload.id);
    }
}
