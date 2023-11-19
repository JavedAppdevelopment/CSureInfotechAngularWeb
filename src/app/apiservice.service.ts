import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class APIServiceService {

  constructor(private httpClient: HttpClient) { }

  url="http://localhost:3000/users";
  users()
  {
    return this.httpClient.get(this.url);
  }
  

}
