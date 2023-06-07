import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
@Injectable({
  providedIn: 'root'
})
export class ClientService {
private url="http://localhost:3000/api/client";
  constructor(private http:HttpClient) { }
 getAll(){
    return this.http.get<any>(this.url+'/all-client')
 }
 addClient(resource:any){
  let id=localStorage.getItem('id')
    return this.http.post<any>(this.url+'/new-client/'+id,resource)
 }
 delete(id:any){
  let idR=localStorage.getItem('id')
    return this.http.delete<any>(this.url+'/delete-client/'+id+'/'+idR)
 }

 getClient(id:any){
   return this.http.get<any>(this.url+'/getSingleCustomer/'+id)
 }

 updateCustomer(resource:any,id:any){
   let idR=localStorage.getItem('id')
   return this.http.put<any>(this.url+'/updateCustomer/'+id+'/'+idR,resource)
 }
}
