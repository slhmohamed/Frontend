import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
 
@Injectable({
  providedIn: 'root'
})
export class LogService {
 
private url="http://localhost:3000/api/log";
  constructor(private http:HttpClient) { }
 

 getAll(){
  let id=localStorage.getItem('id')
    return this.http.get<any>(this.url+'/all-log/'+id)
 }
 
 
}
