import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ResourceDocument = Resource & Document;

@Schema()
export class Resource {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  year: String;

  @Prop({ required: false })
  color: string;

  @Prop({ required: true })
  pantone_value: string;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);

// Setting the options on the generated schema
ResourceSchema.set('timestamps', false);
ResourceSchema.set('versionKey', false);
