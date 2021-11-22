import { BadRequestException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { CreateMenuDto, CreateMenuListDto } from './dto/create-menu.dto';
import { MenuList } from './schemas/menu-list.schema';
import { Menu } from './schemas/menu.schema';
import { Tag } from './schemas/tag.schema';
import { ObjectId } from "mongoose";
import { ClientProxy } from '@nestjs/microservices';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class MenuService {
    constructor(
        private readonly logger : LoggerService,
        private restaurantService: RestaurantService,
        @InjectModel(Menu.name) private menuModel: Model<Menu>,
        @InjectModel(Tag.name) private tagModel: Model<Tag>,
        @Inject('MatchingClient') private matchingClient: ClientProxy,
    ) { }

    async find(ownerId: number): Promise<Menu[]> {
        const menus = await this.menuModel.find({ownerId: ownerId}).populate('allergies').populate('categories');
        return menus;
    }

    async create(ownerId: number , createMenuListDto: CreateMenuListDto): Promise<Menu[]> {
        const existedRestaurant = await this.restaurantService.find(ownerId);
        if(!existedRestaurant) {
            throw new BadRequestException('Restaurant is not registered');
        }
        const menus = [];
        const menuIds = [];
        const menuPayload = {
            id: ownerId,
            ...createMenuListDto
        };
        for(let menu of createMenuListDto.menus) {
            menu['ownerId'] = ownerId;
            const createdMenu = new this.menuModel(menu);
            const save_menu = await createdMenu.save()
            .then((menu) => menu.populate('allergies'))
            .then((menu) => menu.populate('categories'));
            menuIds.push(save_menu['_id']);
            menus.push(save_menu);
        }
        
        this.restaurantService.updateMenu(ownerId, menuIds);

        // this.restaurantService.updateMenu(ownerId,menuIds);        
        this.matchingClient.emit('MenuCreated', menuPayload);
        return menus;
      }

    async createTag(id: ObjectId, name: string): Promise<Tag> {
        const createdTag = new this.tagModel({
            _id: id,
            name: name,
        });
        return createdTag.save();
    }
}
