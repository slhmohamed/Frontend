import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
private url="http://localhost:3000/api/user";
  constructor(private http:HttpClient) { }

 getUser(id:any){
    return this.http.get<any>(this.url+'/get-user/'+id)
 }

 getAll(id:any){
    return this.http.get<any>(this.url+'/get-users/'+id)
 }
 update(id:any,resource:any){
 
   return this.http.put<any>(this.url+'/updateUser/'+id,resource)
 }

 
 delete(id){
  let idR=localStorage.getItem('id')
    return this.http.delete<any>(this.url+'/delete-user/'+id+'/'+idR)  
 }
 add(resource:any){
   let id=localStorage.getItem('id')
   return this.http.post<any>(this.url+'/add-user/'+id,resource)   
 }
}
