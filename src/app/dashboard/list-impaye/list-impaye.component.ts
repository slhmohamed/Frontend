import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ImpayeService } from 'src/app/services/impaye.service';
import { UserService } from 'src/app/services/user.service';
import * as html2pdf from 'html2pdf.js'
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-list-impaye',
  templateUrl: './list-impaye.component.html',
  styleUrls: ['./list-impaye.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListImpayeComponent implements OnInit,OnDestroy{
  impayes:any;
  results:any;
  role:any

  searchFilter!:FormGroup
  type:any
  constructor(private router:Router,private fb:FormBuilder,
    private userService:UserService,private toast: HotToastService,
    private authService:AuthService,private impayeService:ImpayeService){


  }
  ngOnInit() {
    this.authService.role.subscribe(res=>{
      console.log(res);
      
      this.role=res
     })
    this.searchFilter=this.fb.group({
      num_compte:['',Validators.required],
      status:['',Validators.required]
    })
   

    this.getAll()
  
    
  }
  getAll(){
    this.impayeService.getAll().subscribe(res=>{
      this.results=res.data;
      if(localStorage.getItem('role')=='Admin'||localStorage.getItem('role')=='Précontentieux'||
      localStorage.getItem('role')=='Financier' ){
        this.impayes=this.results;
      }

      if(localStorage.getItem('role')=='Commerciaux'){
        this.userService.getUser(localStorage.getItem('id')).subscribe(res=>{

          switch(res.data.type){
            case 'DVD':
              this.impayes=this.results.filter(el=> el.destination=='DVD')  ;
            console.log(this.impayes);
            break;
            case 'GAZ':
            this.impayes=this.results.filter(el=> el.destination=='GAZ')  
            console.log(this.impayes);
            break;
            case 'RESEAU':
              this.impayes=this.results.filter(el=> el.destination=='RESEAU')  
            
            console.log(this.impayes);
              
            break;
            

            
          }
        })
      }
    })
  }
  ngOnDestroy() {
    
  }
  logout(){

    localStorage.removeItem('id')
    localStorage.removeItem('role')
    this.authService.setRole('')
    this.router.navigate(['/']);
    
  }
  checkValue(e:any){
    this.impayeService.getByType(e.target.value).subscribe(res=>{
      this.results=res.data;
      if(localStorage.getItem('role')=='Admin'||localStorage.getItem('role')=='Précontentieux'||
      localStorage.getItem('role')=='Financier' ){
        this.impayes=this.results;
      }

      if(localStorage.getItem('role')=='Commerciaux'){
        this.userService.getUser(localStorage.getItem('id')).subscribe(res=>{

          switch(res.data.type){
            case 'DVD':
              this.impayes=this.results.filter(el=> el.destination=='DVD')  ;
            console.log(this.impayes);
            break;
            case 'GAZ':
            this.impayes=this.results.filter(el=> el.destination=='GAZ')  
            console.log(this.impayes);
            break;
            case 'RESEAU':
              this.impayes=this.results.filter(el=> el.destination=='RESEAU')  
            
            console.log(this.impayes);
              
            break;
            

            
          }
        })
      }
    })

    
  }

  statusChange(e:any,id:any){
    console.log(id);
    
    if(e.target.value!=''){
      console.log(e.target.value);
        let resource={
          status:e.target.value
        }
      this.impayeService.updateStatus(resource,id).subscribe(res=>{
        this.toast.success("Impayé modifié");
        this.getAll()
      })
      
    }
  }
  onSubmit(){
    
   this.impayeService.searchImpaye(this.searchFilter.value).subscribe(res=>{
   if(localStorage.getItem('role')=='Admin'||localStorage.getItem('role')=='Précontentieux'||
   localStorage.getItem('role')=='Financier' ){
     this.impayes=res.data;
   }

   if(localStorage.getItem('role')=='Commerciaux'){
     this.userService.getUser(localStorage.getItem('id')).subscribe(res=>{

       switch(res.data.type){
         case 'DVD':
           this.impayes=this.results.filter(el=> el.destination=='DVD')  ;
         console.log(this.impayes);
         break;
         case 'GAZ':
         this.impayes=this.results.filter(el=> el.destination=='GAZ')  
         console.log(this.impayes);
         break;
         case 'RESEAU':
           this.impayes=this.results.filter(el=> el.destination=='RESEAU')  
         
         console.log(this.impayes);
           
         break;
         

         
       }
     })
   }
  })
  }
  public rapport( ): void {  
   
    
   
    const option ={
      filename:"Rapport-"+Date.now()+".pdf",
      image:{
        type:'jpeg'
      },
      html2canavas:{},
      jsPDF:{orientation:'portrait'}
  
    };
    const content : Element=document.getElementById('content')
      html2pdf().from(content).set(option).save()
  }
}
 

