import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  @Input() trendingMovies:any = null;
  imagepath:string='https://image.tmdb.org/t/p/w500';
  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    autoplayTimeout:2500,
    autoplayHoverPause:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin:5,
    navSpeed: 400,
    navText: ['<i class="fa-solid fa-arrow-left text-black"></i>', '<i class="fa-solid fa-arrow-right text-black"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 8
      }
    },
    nav: true
  }
  constructor() { }

  ngOnInit(): void {
  }

}
