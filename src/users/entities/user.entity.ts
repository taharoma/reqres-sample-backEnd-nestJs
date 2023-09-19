import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: false })
  first_name: string;

  @Prop({ required: false })
  last_name: string;

  @Prop({ required: false })
  avatar: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: 'CLIENT', enum: ['CLIENT', 'ADMIN'] })
  role: string;

  @Prop()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Setting the options on the generated schema
UserSchema.set('timestamps', true);
UserSchema.set('versionKey', false);
