import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TagDocument = Tag & Document;

@Schema()
export class Tag {

  @Prop()
  name: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);