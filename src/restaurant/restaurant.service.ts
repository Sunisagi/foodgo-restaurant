import { Injectable, Inject, BadRequestException, Logger, OnModuleInit, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { Restaurant } from './schemas/restaurant.schema';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { User } from './schemas/user.schema';
import { Observable } from 'rxjs';
import { ObjectId } from "mongoose";
import { LoggerService } from 'src/logger/logger.service';
import { Menu } from 'src/menu/schemas/menu.schema';

@Injectable()
export class RestaurantService{

    constructor(
        private readonly logger : LoggerService,
        @InjectModel('restaurants') private readonly restaurantModel: Model<Restaurant>,
        @InjectModel('users') private readonly userModel: Model<User>,
        @Inject('AuthClient') private authClient: ClientProxy,
        @Inject('MatchingClient') private matchingClient: ClientProxy,
    ) { }

    async findWithMenu(ownerId: number): Promise<Restaurant> {        
        const restaurant = await this.restaurantModel.findById(ownerId).populate(
            {
                path: 'menus',
                populate: [{
                    path: 'categories',
                    model: 'Tag',
                },
                {
                    path: 'allergies',
                    model: 'Tag',
                }],
            }
        )
        return restaurant;
    }

    async find(ownerId: number): Promise<Restaurant> {
        const restaurant = await this.restaurantModel.findById(ownerId).select('-menus');
        return restaurant
    }

    async create(ownerId: number, createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
        const user = await this.userModel.findById(ownerId);
        if (!user) {
            throw new BadRequestException('The user does not exist');
        }

        const existingUser = await this.find(ownerId);      

        if (existingUser) {
            throw new BadRequestException('Id has already registered');
        }
        const createdRestaurant = new this.restaurantModel({
            _id: ownerId,
            ...createRestaurantDto
        });
        this.authClient.emit('UserInformed', { id: ownerId });        
        const restaurant =  await createdRestaurant.save();   
        const restaurantPayload = {
            id: ownerId,
            ...createRestaurantDto
        };
        this.matchingClient.emit('RestaurantCreated', restaurantPayload);   
        return restaurant;
      }

    async createUser(id: number): Promise<User> {
        const createdUser = new this.userModel({ _id: id });
        return createdUser.save();
    }

    async updateMenu(ownerId: number, menuId: any[]): Promise<any> {
        let IdList = (await this.restaurantModel.findById(ownerId)).menus;
        const newMenuId = IdList.concat(menuId);
        const restaurant = await this.restaurantModel.findOneAndUpdate({'_id': ownerId}, {menus: newMenuId});
        return restaurant
    }
}
