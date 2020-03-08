import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const localUrl = 'http://localhost:8080';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { 

  }

  getPessoas(){
    return this.http.get(localUrl+"/pessoas")
  }

  inserirPessoa(pessoa : any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post(localUrl+"/pessoas", pessoa, httpOptions)
  }

  deletarPessoa(id: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.delete(localUrl+"/pessoas", id)
  }
 
}
