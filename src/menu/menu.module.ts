import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MenuListSchema } from './schemas/menu-list.schema';
import { MenuSchema } from './schemas/menu.schema';
import { TagSchema } from './schemas/tag.schema';

@Module({
  imports: [
    RestaurantModule,
    MongooseModule.forFeature([
      { name: 'menulists', schema: MenuListSchema },
      { name: 'menus', schema: MenuSchema},
      { name: 'tags', schema: TagSchema}
    ])],
  controllers: [MenuController],
  providers: [MenuService]
})
export class MenuModule {}
