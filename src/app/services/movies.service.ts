import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  apiKey:string='611254cdff6887a0285d5dee94ac0d16'
  constructor(private _httpClient:HttpClient) { }

  getTrending(mediaType:string,page?:number):Observable<any>{
    if(!page){
      page = 1
    }
    return this._httpClient.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=${this.apiKey}&page=${page}`);
  }
  getDetail(id:any,mediaType:any):Observable<any>{
    return this._httpClient.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${this.apiKey}&language=en-US`);
  }
  getRecommendations(id:any,mediaType:any,page?:number):Observable<any>{
    if(!page){
      page = 1
    }
    return this._httpClient.get(`https://api.themoviedb.org/3/${mediaType}/${id}/recommendations?api_key=${this.apiKey}&language=en-US&page=${page}`);
  }
  getPersonMovies(id:number){
    return this._httpClient.get(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${this.apiKey}&language=en-US`);
  }
  getTrailer(id:number,mediaType:string){
    return this._httpClient.get(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${this.apiKey}&language=en-US`);
  }
  search(text?:string,page?:number){
    if(!page){
      page = 1
    }
    if(!text){
      text='.'
    }
    return this._httpClient.get(`https://api.themoviedb.org/3/search/multi?api_key=${this.apiKey}&language=en-US&query=${text}&page=${page}&include_adult=true`);
  }
}
