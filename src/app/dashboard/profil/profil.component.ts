import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';
import { LogService } from 'src/app/services/log.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfilComponent {
  eventForm !:FormGroup;
  role:any
  @ViewChild('content', { static: false }) el!: ElementRef;
 
@ViewChild('myModal', { static: false }) myModal: ElementRef ;
elm:any= HTMLElement;
  userForm!:FormGroup;
  logs:any;
  dynamicVariable = false;
  constructor(private fb:FormBuilder, private router:Router,private userService:UserService,private toast: HotToastService,
    private authService:AuthService,private logService:LogService
    ){
     
    }

  ngOnInit() {
    this.authService.role.subscribe(res=>{
      console.log(res);
      
      this.role=res
     })
    this.userForm=this.fb.group({
      role:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
     firstName:['',Validators.required],
     lastName:['',Validators.required],
    phone:['',Validators.required]
   

    })
  this.userService.getUser(localStorage.getItem('id')).subscribe(res=>{
    this.userForm.patchValue({
      role:res.data.role,
      email:res.data.email,

      firstName:res.data.firstName,
      lastName:res.data.lastName,
      phone:res.data.phone,
    })

  })
 
 
    const element1 = document.getElementById("header1");
    element1.setAttribute("hidden","true");
    const element2 = document.getElementById("ftco-footer");
    element2.setAttribute("hidden","true");
  }
  ngOnDestroy() {
    
  }
  onSubmit(){
    console.log(this.userForm.value);
    this.userService.update(localStorage.getItem('id'),this.userForm.value).subscribe(res=>{
      this.toast.success('User updated with success')
    })
    
  }
  ngAfterViewInit(): void {
    this.elm = this.myModal.nativeElement as HTMLElement;
 }
 close(): void {
  
     this.elm.classList.remove('show');
     setTimeout(() => {
       this.elm.style.width = '0';
     }, 75);
 }
 open(): void {
   
  
     this.elm.classList.add('show');
     this.elm.style.width = '100vw';
    this.logService.getAll().subscribe(res=>{
      this.logs=res.data
      
      
    })
 }
 
 logout(){

  localStorage.removeItem('id')
  localStorage.removeItem('role')
  this.authService.setRole('')
  this.router.navigate(['/']);
  
  
}
}
