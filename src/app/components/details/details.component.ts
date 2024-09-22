import { Component, Input, OnInit,OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Paginator } from 'primeng/paginator';
import { MoviesService } from 'src/app/services/movies.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit,OnChanges {
  pages:any;
  id:any;
  media_type:any;
  detail:any;
  Recommendations:any;
  personMovies:any;
  imagepath:string='https://image.tmdb.org/t/p/w500';
  youtubepath:string='https://www.youtube.com/embed/';
  constructor(private route: ActivatedRoute,private _moviesService:MoviesService,private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.id = params['id'];
      this.media_type = params['media_type'];
      this.youtubepath = 'https://www.youtube.com/embed/';
      this._moviesService.getDetail(this.id,this.media_type).subscribe((res)=>{
        this.detail = res;
      })
      if(this.media_type == 'person'){
        this._moviesService.getPersonMovies(this.id).subscribe((res:any)=>{
          this.personMovies = res.cast
        });
      }else{
        this._moviesService.getTrailer(this.id,this.media_type).subscribe((res:any)=>{
          let x =res.results.filter((obj:any) => {
            return obj.site === 'YouTube' && (obj.type === 'Trailer' || obj.type === 'Clip');
          });
          this.youtubepath = 'https://www.youtube.com/embed/';
          this.youtubepath += x[0].key;
        });
        this.getRecommendations(this.id,this.media_type,1);
      }
    }
    );
  }
  ngOnChanges(changes: SimpleChanges):void {
  }
  getRecommendations(id:number,media_type:string,pages?:any){
    this._moviesService.getRecommendations(id,media_type,pages).subscribe((data)=>{
      this.Recommendations = data.results;
      this.pages = data.total_pages;
    });
  }
  paginate(event:any) {
    let index = event.page +1
    this.getRecommendations(this.id,this.media_type,index);
  }
  @ViewChild('p') paginator: Paginator | undefined;

  reset($event:any) {
      this.paginator?.changePageToFirst($event);
  }
}
