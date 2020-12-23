import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../interfaces/Game';
import { User } from '../interfaces/User';

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
    return this.http.get(`${this.baseUrl}/platforms`);
  }

  public addPlatform(body: {name: string, show: boolean}) {
    return this.http.post(`${this.baseUrl}/platforms`, body);
  }

  public getTournaments() {
    return this.http.get(`${this.baseUrl}/tournaments`);
  }

  public addTournament(body: {name: string, show: boolean}) {
    return this.http.post(`${this.baseUrl}/tournaments`, body);
  }

  public getGames() {
    return this.http.get<Game[]>(`${this.baseUrl}/games`);
  }

  public addGames(body: {name: string, show: boolean}) {
    return this.http.post(`${this.baseUrl}/games`, body);
  }

  public getUsers() {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  public getUser(id: string) {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

}
