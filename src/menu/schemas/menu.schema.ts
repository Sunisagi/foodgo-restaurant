import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MealTime } from '../enums/menus-mealtime.enum';
import {Tag, TagSchema} from './tag.schema'
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type MenuDocument = Menu & Document;

@Schema()
export class Menu {
  @Prop({required: true})
  name: string;

  @Prop({required: true})
  price: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Tag.name }] })
  categories: Tag[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Tag.name }] })
  allergies: Tag[];

  @Prop({required: true, enum: MealTime})
  mealTime: string;
}


export const MenuSchema = SchemaFactory.createForClass(Menu);

