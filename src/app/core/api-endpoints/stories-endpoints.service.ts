import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CreateGameModel } from '../api-models/create-game-model';
import { CreateStoryModel } from '../api-models/create-story-model';
import { ReadGameCreatedModel } from '../api-models/read-game-created-model';
import { ReadStoryModel } from '../api-models/read-story-model';
import { UpdateStoryModel } from '../api-models/update-story-model';
import { BaseApiEndpoints } from './base-endpoints';

@Injectable({
  providedIn: 'root'
})
export class StoriesEndpointsService extends BaseApiEndpoints {

  constructor(private http:HttpClient) {
    super();
  }

  public getAll():Observable<ReadStoryModel[]>{
    return this.http.get<ReadStoryModel[]>(this.securedBasePath + '/stories', {headers: this.createHttpHeadersJson()}).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }

  public get(id:number):Observable<ReadStoryModel>{
    return this.http.get<ReadStoryModel>(this.securedBasePath + '/stories/' + id, {headers: this.createHttpHeadersJson()}).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }

  public delete(id:number):Observable<any>{
    return this.http.delete<any>(this.securedBasePath + '/stories/' + id).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }

  public post(model:CreateStoryModel):Observable<ReadStoryModel>{
    return this.http.post<ReadStoryModel>(this.securedBasePath + '/stories', model, {headers:this.createHttpHeadersJson()}).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }

  public put(id:number, model:UpdateStoryModel):Observable<ReadStoryModel>{
    return this.http.put<ReadStoryModel>(this.securedBasePath + '/stories/' + id, model, {headers:this.createHttpHeadersJson()}).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }

  public postGame(model:ReadStoryModel):Observable<ReadGameCreatedModel>{
    const createGameModel:CreateGameModel = {
      storyId: model.id
    };
    return this.http.post<ReadGameCreatedModel>(this.securedBasePath + '/stories/game', createGameModel, {headers:this.createHttpHeadersJson()}).pipe(
      catchError((err:HttpErrorResponse) => {
        return this.handleHttpError(err);
      })
    );
  }
}
