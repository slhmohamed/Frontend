import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { ImpayeService } from 'src/app/services/impaye.service';

@Component({
  selector: 'app-impaye',
  templateUrl: './impaye.component.html',
  styleUrls: ['./impaye.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ImpayeComponent implements OnInit{
  impayeForm!:FormGroup;
  clients:any;
  client_Banque:any="Client Banque"
  motif:boolean=true
  role:any
  constructor(private fb:FormBuilder,private authService:AuthService,
    private router:Router,private toast: HotToastService,
    private clientService:ClientService,
    private impayeService:ImpayeService) {
      this.authService.role.subscribe(res=>{
        console.log(res);
        
        this.role=res
       })
     }

  ngOnInit() {

    this.clientService.getAll().subscribe(res=>{
      console.log(res.data);
      
      this.clients=res.data
      console.log(this.clients);
      
    })
    this.impayeForm=this.fb.group({
      num_compte:[Math.floor(Math.random() * 10000),Validators.required],
      banque_sndp:['',Validators.required],
      banque_client:['',Validators.required],
      client:['',Validators.required],
      num_document:[Math.floor(Math.random() * 10000),Validators.required],
      dateEmision:['',Validators.required],
      montant:['',Validators.required],
      motif:['',Validators.required],
      coment:['',Validators.required],
      destination:['',Validators.required],
      envoie:['',Validators.required],
      dateArrive:['',Validators.required],
      type:['',Validators.required],
     // status:['',Validators.required],
    })
    const element1 = document.getElementById("header1");
    element1.removeAttribute("hidden");
    const element2 = document.getElementById("ftco-footer");
    element2.removeAttribute("hidden");
  }


  onSubmit(){
    
//send the object to database

console.log(this.impayeForm.value);
this.impayeService.save(this.impayeForm.value,localStorage.getItem('id')).subscribe(res=>{
  this.toast.success('Impyae ajouté avec success')
  this.router.navigate(['/list-impayé']);
  
})

     

  }
  checkValue(e:any){
    console.log(e.target.value);
    if(e.target.value=='Chéque'){
      this.impayeForm.patchValue({
        type:"Chéque"
      })
    this.motif=true
    }else{
      this.motif=false
      this.impayeForm.patchValue({
        type:"Effet"
      })
    }
  }   
  
  logout(){

    localStorage.removeItem('id')
    localStorage.removeItem('role')
    this.authService.setRole('')
    this.router.navigate(['/']);
    
  }
  onChange(e:any){
let client=this.clients.filter(el=> el._id==e);
console.log(client);

    this.client_Banque=client[0].banque

    
  }
}
