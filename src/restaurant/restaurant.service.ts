import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { Restaurant } from './schemas/restaurant.schema';

@Injectable()
export class RestaurantService {
    constructor(@InjectModel('restaurants') private readonly restaurantModel: Model<Restaurant>) { }

    async find(ownerId: string): Promise<Restaurant> {
        const restaurant = await this.restaurantModel.findOne({ownerId : ownerId});
        let output = restaurant.toObject();
        delete output['ownerId']
        delete output['__v']
        delete output['_id']
        return output;
    }

    async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
        const createdRestaurant = new this.restaurantModel(createRestaurantDto);
        const restaurant =  await createdRestaurant.save();
        let output = restaurant.toObject();
        delete output['ownerId']
        delete output['__v']
        delete output['_id']
        return output;
      }
}
