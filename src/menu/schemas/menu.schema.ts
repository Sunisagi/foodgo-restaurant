import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MealTime } from '../enums/menus-mealtime.enum';
import {Tag, TagSchema} from './tag.schema'

@Schema()
export class Menu {
  @Prop({required: true})
  name: string;

  @Prop({required: true})
  price: number;

  @Prop({type: [], required: true, _id: false})
  categories: Tag[];

  @Prop({type: [], required: true, _id: false})
  allergies: Tag[];

  @Prop({required: true, enum: MealTime})
  mealTime: string;
}


export const MenuSchema = SchemaFactory.createForClass(Menu);

