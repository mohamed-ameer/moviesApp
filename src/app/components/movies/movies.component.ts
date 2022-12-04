import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  pages:any;
  trendingMovies:any = null;
  imagepath:string='https://image.tmdb.org/t/p/w500'
  constructor(private _moviesService:MoviesService) { }
  getTrendingMovies(pages?:any){
    this._moviesService.getTrending('movie',pages).subscribe((data)=>{
      this.trendingMovies = data.results;
      this.pages = data.total_pages;
    })
  }
  ngOnInit(): void {
    this.getTrendingMovies();
  }

  paginate(event:any) {
    let index = event.page +1
    this.getTrendingMovies(index);
  }
}
