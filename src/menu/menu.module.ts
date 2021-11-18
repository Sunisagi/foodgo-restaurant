import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MenuList, MenuListSchema } from './schemas/menu-list.schema';
import { Menu, MenuSchema } from './schemas/menu.schema';
import { Tag, TagSchema } from './schemas/tag.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [
    RestaurantModule,
    LoggerModule,
    MongooseModule.forFeature([
      { name: MenuList.name , schema: MenuListSchema },
      { name: Menu.name , schema: MenuSchema},
      { name: Tag.name, schema: TagSchema}
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
  controllers: [MenuController],
  providers: [MenuService]
})
export class MenuModule {}
