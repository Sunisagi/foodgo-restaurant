import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MenuListSchema } from './schemas/menu-list.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'menus', schema: MenuListSchema }])],
  controllers: [MenuController],
  providers: [MenuService]
})
export class MenuModule {}
