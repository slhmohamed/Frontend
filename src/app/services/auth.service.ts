import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
 
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
private url="http://localhost:3000/api/auth";
  constructor(private http:HttpClient) { }
  nameSubject = new BehaviorSubject<any>('');
  roleSubject= new BehaviorSubject<string>(localStorage.getItem('role'));
  name = this.nameSubject.asObservable();
  role = this.roleSubject.asObservable();

 login(resource:any){
    return this.http.post<any>(this.url+'/signin',resource)
 }

 
 setName(value:any){
   this.nameSubject.next(value);

 }
 setRole(value:any){
   this.roleSubject.next(value);

 } 
}
