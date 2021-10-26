import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);