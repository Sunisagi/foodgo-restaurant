import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post } from '@nestjs/common';
import { CreateMenuDto, CreateMenuListDto } from 'src/menu/dto/create-menu.dto';
import { MenuService } from 'src/menu/menu.service';
import { Menu } from './schemas/menu.schema';
import { ObjectId } from "mongoose";
import { EventPattern } from '@nestjs/microservices';

@Controller('')
export class MenuController {
    constructor(private readonly menuService: MenuService) { }

    @Get(':ownerId/menus')
    find(@Param('ownerId') ownerId: number): Promise<Menu[]> {
        const menu = this.menuService.find(ownerId);
        return menu;
    }

    @Post(':ownerId/menus')
    Create(@Param('ownerId') ownerId:number, @Body() body:CreateMenuListDto): Promise<Menu[]> { 
        const menu = this.menuService.create(ownerId, body);
        return menu;
   }

   @EventPattern('TagCreated')
   handleEvent(payload: { id: ObjectId , name: string}) {
       return this.menuService.createTag(payload.id, payload.name);
   }
}
