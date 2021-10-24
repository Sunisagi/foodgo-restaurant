import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMenuDto, CreateMenuListDto } from './dto/create-menu.dto';
import { MenuList } from './schemas/menu-list.schema';
import { Menu } from './schemas/menu.schema';

@Injectable()
export class MenuService {
    constructor(@InjectModel('menus') private readonly menuModel: Model<MenuList>) { }

    async find(ownerId: string): Promise<Menu[]> {
        const {menus, ...output} = await this.menuModel.findOne({ownerId : ownerId});
        return menus;
    }

    async create(createMenuDto: CreateMenuListDto): Promise<Menu[]> {
        const createdMenu = new this.menuModel(createMenuDto);
        const {menus, ...output} =  await createdMenu.save();
        return menus;
      }
}
