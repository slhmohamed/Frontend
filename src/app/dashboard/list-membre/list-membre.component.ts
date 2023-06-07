import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core'; import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-membre',
  templateUrl: './list-membre.component.html',
  styleUrls: ['./list-membre.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListMembreComponent implements OnInit, OnDestroy {
  @ViewChild('content', { static: false }) el!: ElementRef;

  @ViewChild('myModal', { static: false }) myModal: ElementRef;
  elm: any = HTMLElement; userForm!: FormGroup;
  users: any = []
  commerciaux:boolean=false
  role:any
  constructor(
    private fb: FormBuilder, private router:Router,
    private userService: UserService, private toast: HotToastService,
    private authService:AuthService
    ) { 
      
    }
  ngOnInit() {
    this.authService.role.subscribe(res=>{
      console.log(res);
      
      this.role=res
     })
    this.getAll()
    this.userForm = this.fb.group({
      role: ['', Validators.required],
      email: ['', Validators.required],
      hashed_password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      type: [''],


    })

    
  }
  ngOnDestroy() {
    
  }
  
  
  getAll() {

   
    this.userService.getAll(localStorage.getItem('id')).subscribe(res => {
      this.users = res.data
    })
  }
  delete(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(id).subscribe(res => {
          this.toast.success('Membre deleted with success!!');
          this.getAll()
        })
      }
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

  }
  onSubmit() {
    console.log(this.userForm.value);
    this.userService.add(this.userForm.value).subscribe(res => {
      this.toast.success("User added with success")
      this.getAll()
      this.close()
      this.userForm.reset()
    }, (error) => {
      this.toast.error(error.error.message)
    })
  }
 
  
  logout(){

    localStorage.removeItem('id')
    localStorage.removeItem('role')
    this.authService.setRole('')
    this.router.navigate(['/']);
    
    
  }

  onChange(val:any){

    console.log(val);
    
    this.commerciaux=val==='Commerciaux' ? true : false;
    console.log(this.commerciaux);
    
  }
}
