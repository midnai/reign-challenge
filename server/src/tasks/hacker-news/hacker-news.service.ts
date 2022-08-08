import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AxiosResponse } from 'axios';
import { ArticlesService } from 'src/articles/articles.service';

@Injectable()
export class HackerNewsService {
  private readonly logger = new Logger(HackerNewsService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly articlesService: ArticlesService
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    this.logger.debug('calling hacker-news api each hour...');

    try {
      const result = await this.getHackerNewsLastNews();

      if (result.data.hits) {
        const hits = result.data.hits;

        hits.map((h: any) => {
          const title = h.story_title || h.title;
          const url = h.story_url || h.url;
          this.articlesService.upsert(
            {
              title: title,
              published_date: new Date(h.created_at),
              url: url,
              author: h.author
            },
            { title: title }
          );
        });
      }

      this.logger.debug('last hacker-news inserted...');
    } catch (error) {
      this.logger.warn(error);
    }
  }

  getHackerNewsLastNews(): Promise<AxiosResponse<any>> {
    return this.httpService.axiosRef.get(
      'https://hn.algolia.com/api/v1/search_by_date?query=nodejs'
    );
  }
}
