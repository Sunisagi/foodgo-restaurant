import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import {RestaurantSchema } from './schemas/restaurant.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'restaurants', schema: RestaurantSchema }])],
  controllers: [RestaurantController],
  providers: [RestaurantService]
})
export class RestaurantModule {}
