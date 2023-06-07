import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListClientComponent {

  clientForm !:FormGroup;
  @ViewChild('content', { static: false }) el!: ElementRef;
 
@ViewChild('myModal', { static: false }) myModal: ElementRef ;
elm:any= HTMLElement;
isLoged:any;
user:any;
modalTitle=''
events:any=[]
id:any=''
role:any
constructor( private router:Router,private fb:FormBuilder,private toast: HotToastService,
  private clientService:ClientService,private authService:AuthService){
   
  }
  ngOnInit() {
    this.authService.role.subscribe(res=>{
       
      this.role=res
     })

    this.getAllClient()
    
    this.clientForm=this.fb.group({
    
            email:['',Validators.required],
            firstName:['',Validators.required],
            lastName:['',Validators.required],
            banque:['',Validators.required],
            phone:['',Validators.required],
             

    })
    
  }
  ngOnDestroy() {
 
  }
  ngAfterViewInit(): void {
    this.elm = this.myModal.nativeElement as HTMLElement;
 }
 close(): void {
  this.clientForm.reset()
     this.elm.classList.remove('show');
     setTimeout(() => {
       this.elm.style.width = '0';
     }, 75);
 }
 
 open(): void {
  this.modalTitle='Ajouter nouveau client'
  
     this.elm.classList.add('show');
     this.elm.style.width = '100vw';
     this.id=''
 }
 openUpdate(id): void {
  this.id=id;
  this.modalTitle='Modifier client'

  this.clientService.getClient(id).subscribe(res=>{
this.clientForm.patchValue({
  email:res.data.email,
  firstName:res.data.firstName,
  lastName:res.data.lastName,
  banque:res.data.banque,
  phone:res.data.phone,
})
      
 
  })
  
     this.elm.classList.add('show');
     this.elm.style.width = '100vw';
 }
 

 onSubmit(){
 

  if(this.id==''){ 
  
 if(this.clientForm.valid){
  this.clientService.addClient(this.clientForm.value).subscribe(res=>{
    this.close();
    this.clientForm.reset()
    this.toast.success('Client added with success!!');
    this.getAllClient()
  },(error=>{
    console.log(error.error);
    
    this.toast.error(error.error.message)
  }))
 }

 }else{
this.clientService.updateCustomer(this.clientForm.value,this.id).subscribe(res=>{
  this.toast.success('Clien modifié avec success')
  this.getAllClient()
})
 }
}
  
 getAllClient(){
  this.clientService.getAll().subscribe(res=>{
    this.events=res.data
  })
 }
 deleteClient(id:any){
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
      this.clientService.delete(id).subscribe(res=>{
        this.toast.success('Client deleted with success!!');
    this.getAllClient()
      })
    }
  })
 }
 

 logout(){

  localStorage.removeItem('id')
  localStorage.removeItem('role')
  this.authService.setRole('')
  this.router.navigate(['/']);
  
  
}


}