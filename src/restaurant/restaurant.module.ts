import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import {RestaurantSchema } from './schemas/restaurant.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserSchema } from './schemas/user.schema';
import { join } from 'path';

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
      {
        name: 'LogClient',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50051',
          package: 'log',
          protoPath: join(__dirname, '/log.proto')
        },
      }
    ]),
  ],
  controllers: [RestaurantController],
  exports: [RestaurantService],
  providers: [RestaurantService]
})
export class RestaurantModule {}
