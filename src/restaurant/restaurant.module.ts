import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import {RestaurantSchema } from './schemas/restaurant.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'restaurants', schema: RestaurantSchema},
      {name: 'users', schema: UserSchema}
    ]),
    ClientsModule.register([
      {
        name: 'AuthClient',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq3:5672'],
          queue: 'auth_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'MatchingClient',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq3:5672'],
          queue: 'matching_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [RestaurantController],
  exports: [RestaurantService],
  providers: [RestaurantService]
})
export class RestaurantModule {}
