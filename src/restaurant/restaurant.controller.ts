import { Body, Controller, Get, Param, Res, Post, Req, Headers, InternalServerErrorException } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { Restaurant } from './schemas/restaurant.schema';
import { EventPattern } from '@nestjs/microservices';
import { LoggerService } from 'src/logger/logger.service';

@Controller('')
export class RestaurantController {
    constructor(
        private readonly restaurantService: RestaurantService,
        private readonly logger : LoggerService,
        ) { }

    @Get(':ownerId/information')
    async find(@Param('ownerId') ownerId: number, @Req() request, @Res() response): Promise<Restaurant> {
        const data = {
            host: request.hostname,
            url: request.url,
            ip: request.ip,
            method: request.method,
            status: response.statusCode
        }
        const restaurant = await this.restaurantService.find(ownerId);
        await this.logger.genLog(data.ip,data.host,data.method,data.url,data.status);
        if(restaurant) {
            return response.send(restaurant)
        }
        else {
            throw new InternalServerErrorException('Server Error');
        }
    }

    @Post(':ownerId/information')
    async Create(@Param('ownerId') ownerId:number, @Req() request, @Res() response, @Body() body:CreateRestaurantDto): Promise<Restaurant> {    
        const data = {
            host: request.hostname,
            url: request.url,
            ip: request.ip,
            method: request.method,
            status: response.statusCode
        }
        const restaurant = await this.restaurantService.create(ownerId, body, data);
        await this.logger.genLog(data.ip,data.host,data.method,data.url,data.status);
        
        if(restaurant) {
            return response.send(restaurant)
        }
        else {
            throw new InternalServerErrorException('Server Error');
        }      
    }

    @EventPattern('UserCreated')
    handleEvent(payload: { id: number }) {
        return this.restaurantService.createUser(payload.id);
    }
}
