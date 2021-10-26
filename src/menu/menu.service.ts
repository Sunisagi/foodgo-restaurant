import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { CreateMenuDto, CreateMenuListDto } from './dto/create-menu.dto';
import { MenuList } from './schemas/menu-list.schema';
import { Menu } from './schemas/menu.schema';
import { Tag } from './schemas/tag.schema';

@Injectable()
export class MenuService {
    constructor(
        private restaurantService: RestaurantService,
        @InjectModel('menus') private readonly menuModel: Model<MenuList>,
        @InjectModel('tags') private tagModel: Model<Tag>
    ) { }

    async find(ownerId: number): Promise<Menu[]> {
        const {menus, ...output} = await this.menuModel.findById(ownerId) || {};
        return menus || [];
    }

    async create(ownerId: number , createMenuDto: CreateMenuListDto): Promise<Menu[]> {
        const existedRestaurant = await this.restaurantService.find(ownerId);
        if(!existedRestaurant) {
            throw new BadRequestException('Restaurant is not registered');
        }
        const createdMenu = new this.menuModel(
            {
                _id : ownerId,
                ...createMenuDto,
            });
        const {menus, ...output} =  await createdMenu.save();
        return menus;
      }
}
