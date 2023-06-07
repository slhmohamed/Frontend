import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-sign-in1',
  templateUrl: './sign-in1.component.html',
  styleUrls: ['./sign-in1.component.css'] 
})
export class SignIn1Component implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router, private toast: HotToastService) { }
id=1;
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  
  }
  

  onSubmit() {
 
    this.authService.login(this.loginForm.value).subscribe((res: any) => {
      localStorage.setItem('id', res.id);
      localStorage.setItem('token', res.token)
      localStorage.setItem('role',res.role)
      this.authService.setRole(res.role)
      this.router.navigate(['/list-impayé'])
    }, (error: any) => {
      console.log(error.error);
      this.toast.error(error.error.errors)
    })
    //send the object to database


  }

}
