import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ArticleDocument = Article & mongoose.Document;

@Schema()
export class Article {
  @Prop()
  title: string;

  @Prop()
  author?: string;

  @Prop()
  url: string;

  @Prop()
  published_date?: Date;

  @Prop()
  deleted_at?: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
