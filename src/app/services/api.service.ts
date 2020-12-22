import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://for-the-players.herokuapp.com';
  constructor(private http: HttpClient) { }

  public login(body: {email: string, password: string}) {
    return this.http.post(`${this.baseUrl}/auth/login`, body);
  }

  public getPlatforms() {
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.get(`${this.baseUrl}/platform`);
  }

  public addPlatform(body: {name: string, show: boolean}) {
    return this.http.post(`${this.baseUrl}/platform`, body);
  }
}
