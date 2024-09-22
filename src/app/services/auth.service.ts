import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData = new BehaviorSubject(null);
  constructor(private _httpClient:HttpClient,private _router:Router) {
    if(localStorage.getItem('userToken') != null){
      this.saveUserData();
    }
  }

  saveUserData(){
    let encodedToken = JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken:any = jwtDecode(encodedToken);
    this.userData.next(decodedToken);//===> this.userData = decodedToken;
  }
  signUp(userData:any):Observable<any>{
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',userData)
  }
  signIn(userData:any):Observable<any>{
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin',userData)
  }
  signOut(){
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._router.navigate(['/login']);
  }
}
