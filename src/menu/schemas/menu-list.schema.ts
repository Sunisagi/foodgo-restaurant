import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Menu, MenuSchema} from "./menu.schema";

export type MenuListDocument = MenuList & Document;

@Schema()
export class MenuList {
  @Prop()
  _id: number;
  
  @Prop({ type: [MenuSchema], required: true, _id: false})
  menus: Menu[];
}

export const MenuListSchema = SchemaFactory.createForClass(MenuList);