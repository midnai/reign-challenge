import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Res
} from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async fetchAll(@Res() response) {
    const articles = await this.articlesService.readAll();
    return response.status(HttpStatus.OK).json(articles);
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const article = await this.articlesService.readById(id);
    return response.status(HttpStatus.OK).json(article);
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedArticle = await this.articlesService.delete(id);
    return response.status(HttpStatus.OK).json(deletedArticle);
  }
}
