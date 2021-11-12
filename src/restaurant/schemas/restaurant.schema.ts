import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MenuList } from 'src/menu/schemas/menu-list.schema';
import { Menu } from 'src/menu/schemas/menu.schema';
import * as mongoose from 'mongoose';

export type RestaurantDocument = Restaurant & Document;

@Schema()
export class Restaurant {
  @Prop()
  _id: number;
  
  @Prop({required: true})
  name: string;

  @Prop({required: true})
  phone: string;

  @Prop({required: true})
  address: string;

  @Prop({required: true})
  lat: string;

  @Prop({required: true})
  long: string;

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Menu.name }] })
  // menu: Menu[];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);