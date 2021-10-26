import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MenuListSchema } from './schemas/menu-list.schema';
import { TagSchema } from './schemas/tag.schema';

@Module({
  imports: [
    RestaurantModule,
    MongooseModule.forFeature([
      { name: 'menus', schema: MenuListSchema },
      { name: 'tags', schema: TagSchema}
    ])],
  controllers: [MenuController],
  providers: [MenuService]
})
export class MenuModule {}
