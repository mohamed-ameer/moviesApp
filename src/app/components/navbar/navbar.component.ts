import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  clicked:boolean = false;
  text:string = '.';
  pages:any;
  searchResult:any = null;
  imagepath:string='https://image.tmdb.org/t/p/w500'
  constructor(private _auth:AuthService,private _moviesService:MoviesService) { }
  isLogin:boolean = false;
  signOut(){
    this._auth.signOut();
  }
  ngOnInit(): void {
    this._auth.userData.subscribe({
      next:()=>{ //this function will be invoked whenever the userData changed
        if(this._auth.userData.getValue() != null){
          this.isLogin =true;
        }else{
          this.isLogin =false;
        }
      },
    })
  }
  search(text?:any,pages?:any){
    this.clicked = false;
    this._moviesService.search(text,pages).subscribe((data:any)=>{
      this.searchResult = data.results;
      this.pages = data.total_pages;
    })
  }
  searchInput(text:any){
    this.clicked = false;
    this.text = text.target.value;
    this.search(this.text,1);
    console.log(this.searchResult);

  }
  isClicked(){
    this.clicked = true;
  }
  paginate(event:any) {
    this.clicked = false;
    let index = event.page +1
    this.search(this.text,index);
  }

}
