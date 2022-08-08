import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './schemas/article.schema';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>
  ) {}

  async create(article: Article): Promise<Article> {
    const newArticle = new this.articleModel(article);
    return newArticle.save();
  }

  async upsert(article: Article, filter: any): Promise<Article> {
    return await this.articleModel.findOneAndUpdate(filter, article, {
      new: true,
      upsert: true
    });
  }

  async readAll(): Promise<Article[]> {
    return await this.articleModel
      .find()
      .where('deleted_at')
      .equals(null)
      .sort({ published_date: 'desc' })
      .exec();
  }

  async readById(id): Promise<Article> {
    return await this.articleModel.findById(id).exec();
  }

  async delete(id): Promise<any> {
    return await this.articleModel.findByIdAndUpdate(
      id,
      {
        deleted_at: new Date()
      },
      {
        new: true
      }
    );
  }
}
