import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ArticlesModule } from 'src/articles/articles.module';
import { HackerNewsService } from './hacker-news.service';

@Module({
  imports: [HttpModule, ArticlesModule],
  providers: [HackerNewsService]
})
export class HackerNewsModule {}
