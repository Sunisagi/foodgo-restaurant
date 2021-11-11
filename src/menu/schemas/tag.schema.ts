import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type TagDocument = Tag & Document;

@Schema()
export class Tag {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: ObjectId;

  @Prop()
  name: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);