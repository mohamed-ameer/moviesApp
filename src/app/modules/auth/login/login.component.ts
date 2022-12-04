import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _auth:AuthService,private _router:Router) { }
  loginForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required]),
  });
  error:any = null;
  isLoading:boolean=false;
  submitloginForm(loginForm:FormGroup) {
    if(loginForm.valid){
      console.log(loginForm.value)
      this.isLoading = true ;
      this._auth.signIn(loginForm.value).subscribe({
        next:(response)=>{
          this.isLoading = false;
          if(response.message === 'success'){
            localStorage.setItem('userToken',response.token);
            this._auth.saveUserData();
            this._router.navigate(['/home']);
          }else{
            this.error = response.message;
          }
        },
        error:(err)=> {
          console.log(err.message)
        },
      })
    }else{
      return;
    }
  }
  ngOnInit(): void {
    this._auth.userData.subscribe({
      next:()=>{ //this function will be invoked whenever the userData changed
        if(this._auth.userData.getValue() != null){
          this._router.navigate(['/home']);
        }
      },
    })
  }



}
