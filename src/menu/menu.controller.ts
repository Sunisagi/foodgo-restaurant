import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post, Headers, InternalServerErrorException, Res, Req } from '@nestjs/common';
import { CreateMenuDto, CreateMenuListDto } from 'src/menu/dto/create-menu.dto';
import { MenuService } from 'src/menu/menu.service';
import { Menu } from './schemas/menu.schema';
import { ObjectId } from "mongoose";
import { EventPattern } from '@nestjs/microservices';
import { LoggerService } from 'src/logger/logger.service';

@Controller('')
export class MenuController {
    constructor(
        private readonly menuService: MenuService,
        private readonly logger: LoggerService) { }

    @Get(':ownerId/menus')
    async find(@Param('ownerId') ownerId: number, @Req() request, @Res() response): Promise<Menu[]> {
        const menu = await this.menuService.find(ownerId);
        const data = {
            host: request.hostname,
            url: request.url,
            ip: request.ip,
            method: request.method,
            status: response.statusCode
        }
        await this.logger.genLog(data.ip,data.host,data.method,data.url,data.status);
        if(menu) {
            return response.send(menu);
        }
        else {
            throw new InternalServerErrorException('Server Error');
        }
        
    }

    @Post(':ownerId/menus')
    async Create(@Param('ownerId') ownerId:number, @Req() request, @Res() response, @Body() body:CreateMenuListDto): Promise<Menu[]> {
        const data = {
            host: request.hostname,
            url: request.url,
            ip: request.ip,
            method: request.method,
            status: response.statusCode
        }
        const menu = await this.menuService.create(ownerId, body, data);
        await this.logger.genLog(data.ip,data.host,data.method,data.url,data.status);
        if(menu) {
            return response.send(menu);
        }
        else {
            throw new InternalServerErrorException('Server Error');
        }
   }

   @EventPattern('TagCreated')
   handleEvent(payload: { id: ObjectId , name: string}) {
       return this.menuService.createTag(payload.id, payload.name);
   }
}
