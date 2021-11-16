import { Injectable, Inject, BadRequestException, Logger, OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { Restaurant } from './schemas/restaurant.schema';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { User } from './schemas/user.schema';
import { Observable } from 'rxjs';
import { ObjectId } from "mongoose";

interface LogsService {
    createLog(body: { id: number, dateTime: number, description: string });
  }

@Injectable()
export class RestaurantService implements OnModuleInit {
    private logService;

    constructor(
        @InjectModel('restaurants') private readonly restaurantModel: Model<Restaurant>,
        @InjectModel('users') private readonly userModel: Model<User>,
        @Inject('AuthClient') private authClient: ClientProxy,
        @Inject('MatchingClient') private matchingClient: ClientProxy,
        @Inject('LogClient') private logClient: ClientGrpc,
    ) { }

    onModuleInit() {
        this.logService = this.logClient.getService('LogsService');
      }

    async find(ownerId: number): Promise<Restaurant> {        
        const restaurant = await this.restaurantModel.findById(ownerId);
        const logPayload = {
            id: ownerId,
            dateTime: Date.now(),
            description: 'get restaurant'
        }
        // console.log(this.logService.createLog.toString());
        const a = await this.logService.createLog(logPayload);
        console.log(a)
        return restaurant;
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

        const logPayload = {
            id: ownerId,
            dateTime: Date.now(),
            description: 'restaurant created'
        }
        this.logService.createLog(logPayload) 
        return restaurant;
      }

    async createUser(id: number): Promise<User> {
        const createdUser = new this.userModel({ _id: id });
        return createdUser.save();
    }

    // async updateMenu(ownerId: number, menuId): Promise<any> {
    //     const restaurant = await this.restaurantModel.update({'_id': ownerId}, {menu: menuId});
    //     return restaurant
    // }
}
