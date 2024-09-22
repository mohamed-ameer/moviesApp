import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AboutComponent } from './components/about/about.component';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { MoviesComponent } from './components/movies/movies.component';
import { NetworksComponent } from './components/networks/networks.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { PeopleComponent } from './components/people/people.component';
import { TvShowComponent } from './components/tv-show/tv-show.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';

const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:'full'},
  {path:"home",component:HomeComponent},
  {path:"movies",canActivate:[AuthGuard],component:MoviesComponent},
  {path:"tv-shows",canActivate:[AuthGuard],component:TvShowComponent},
  {path:"people",canActivate:[AuthGuard],component:PeopleComponent},
  {path:"about",canActivate:[AuthGuard],component:AboutComponent},
  {path:"networks",canActivate:[AuthGuard],component:NetworksComponent},
  {path:"details/:id/:media_type",canActivate:[AuthGuard],component:DetailsComponent},

  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},

  {path:"**",component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
