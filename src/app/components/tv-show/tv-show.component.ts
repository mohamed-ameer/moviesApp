import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.scss']
})
export class TvShowComponent implements OnInit {
  pages:any;
  trendingTvShows:any = null;
  imagepath:string='https://image.tmdb.org/t/p/w500'
  constructor(private _moviesService:MoviesService) { }
  getTrendingTvShows(pages?:any){
    this._moviesService.getTrending('tv',pages).subscribe((data)=>{
      this.trendingTvShows = data.results;
      this.pages = data.total_pages;
    })
  }
  ngOnInit(): void {
    this.getTrendingTvShows();
  }
  paginate(event:any) {
    let index = event.page +1
    this.getTrendingTvShows(index);
  }
}
