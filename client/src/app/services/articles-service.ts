import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Article {
  _id: string;
  title: string;
  author?: string;
  url: string;
  published_date?: Date;
  deleted_at?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  constructor(private http: HttpClient) {}

  getArticles$(): Observable<Article[]> {
    return this.http.get<Article[]>('api/articles');
  }

  public deleteArticle$(id: string): Observable<any> {
    return this.http.delete(`api/articles/${id}`);
  }
}
