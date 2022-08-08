import { Component, OnInit } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Article, ArticlesService } from './services/articles-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  faTrashCan = faTrashCan;
  articles$: Observable<Article[]>;

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.articles$ = this.articlesService.getArticles$();
  }

  removeArticle(article: Article): void {
    this.articlesService.deleteArticle$(article._id).subscribe();
    this.getArticles();
  }

  humanizeDate(date: Date | undefined): string {
    if (!Boolean(date)) return '';

    const now = moment();
    const before = moment(date);
    const days = now.diff(before, 'days');

    if (days == 1) {
      return 'Yesterday';
    } else if (days > 1) {
      return before.format('MMM DD');
    }

    return before.format('hh:mm a');
  }
}
