import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
 
@Injectable({
  providedIn: 'root'
})
export class ImpayeService {
 
private url="http://localhost:3000/api/impaye";
  constructor(private http:HttpClient) { }

 save(resource:any,id){
    return this.http.post<any>(this.url+'/add-impaye/'+id,resource)
 }
 updateStatus(resource,id){
   let idR=localStorage.getItem('id')
   return this.http.put<any>(this.url+'/updateStatus/'+id+'/'+idR,resource)
 }

 getAll(){
    return this.http.get<any>(this.url+'/get-impayes')
 }
 getByType(type:any){
   return this.http.get<any>(this.url+'/get-impayes-type/'+type)
}
searchImpaye(resource:any){
   return this.http.get<any>(this.url+'/searchImpaye/'+resource.num_compte+'/'+resource.status)
}
}
