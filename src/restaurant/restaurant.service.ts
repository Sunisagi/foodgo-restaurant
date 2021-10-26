import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { Restaurant } from './schemas/restaurant.schema';
import { ClientProxy } from '@nestjs/microservices';
import { User } from './schemas/user.schema';

@Injectable()
export class RestaurantService {
    constructor(
        @InjectModel('restaurants') private readonly restaurantModel: Model<Restaurant>,
        @InjectModel('users') private readonly userModel: Model<User>,
        @Inject('AuthClient') private authClient: ClientProxy,
    ) { }

    async find(ownerId: number): Promise<Restaurant> {
        const restaurant = await this.restaurantModel.findById(ownerId);
        return restaurant;
    }

    async create(ownerId: number, createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
        const user = await this.userModel.findById(ownerId);
        if (!user) {
          throw new BadRequestException('The user does not exist');
        }

        const existingUser = await this.find(ownerId);      

        if (existingUser) {
            throw new BadRequestException('Id has already');
        }

        const createdRestaurant = new this.restaurantModel({
            _id: ownerId,
            ...createRestaurantDto
        });
        this.authClient.emit('UserInformed', { id: ownerId });
        const restaurant =  await createdRestaurant.save();        
        return restaurant;
      }

    async createUser(id: number): Promise<User> {
        const createdUser = new this.userModel({ _id: id });
        return createdUser.save();
    }
}
