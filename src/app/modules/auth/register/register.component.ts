import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _auth:AuthService,private _router:Router) { }
  registerForm:FormGroup = new FormGroup({
    first_name:new FormControl(null,[Validators.required]),
    last_name:new FormControl(null,[Validators.required]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required]),
    age:new FormControl(null,[Validators.required,Validators.min(16),Validators.max(70)]),
  });
  error:any = null;
  isLoading:boolean=false;
  submitRegisterForm(registerForm:FormGroup) {
    if(registerForm.valid){
      this.isLoading = true ;
      this._auth.signUp(registerForm.value).subscribe({
        next:(response)=>{
          this.isLoading = false;
          if(response.message === 'success'){
            this._router.navigate(['/login']);
          }else{
            this.error = response.message;
          }
        }
      })
    }else{
      return;
    }
  }
  ngOnInit(): void {
  }

}
