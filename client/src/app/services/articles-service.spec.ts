import { HttpClient, HttpResponse } from '@angular/common/http';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Article, ArticlesService } from './articles-service';

describe('ArticlesService', () => {
  let service: ArticlesService;
  let httpTestingController: HttpTestingController;
  let httpSpy: Spy<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ArticlesService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);

    service = TestBed.inject(ArticlesService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getArticles should return expected data', (done) => {
    const expectedData: Article[] = [
      { _id: '1', title: 'one', url: '/one' },
      { _id: '2', title: 'two', url: '/two' },
      { _id: '3', title: 'three', url: '/three' }
    ];

    service.getArticles$().subscribe((data) => {
      expect(data).toEqual(expectedData);
      done();
    });

    const testRequest = httpTestingController.expectOne('api/articles');

    testRequest.flush(expectedData);
  });

  it('should delete an existing customer', (done: DoneFn) => {
    httpSpy.delete.and.nextWith(
      new HttpResponse({
        status: 200
      })
    );

    service.deleteArticle$('1').subscribe((response) => {
      expect(response.status).toEqual(200);
      done();
    }, done.fail);
    expect(httpSpy.delete.calls.count()).toBe(1);
  });
});
