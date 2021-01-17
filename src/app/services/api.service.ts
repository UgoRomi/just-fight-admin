import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Game } from '../interfaces/game.model';
import { Ruleset } from '../interfaces/ruleset.model';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  public login(body: { email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/admin/login`, body);
  }

  public getPlatforms() {
    return this.http.get(`${this.baseUrl}/platforms`);
  }

  public addPlatform(body: { name: string; show: boolean }) {
    return this.http.post(`${this.baseUrl}/platforms`, body);
  }

  public getTournaments() {
    return this.http.get(`${this.baseUrl}/tournaments`);
  }

  public getTournament(id: string) {
    return this.http.get(`${this.baseUrl}/tournaments/${id}`);
  }

  public createTournament(body: any) {
    return this.http.post(`${this.baseUrl}/tournaments`, body);
  }

  public deleteTournament(id: string) {
    return this.http.delete(`${this.baseUrl}/tournaments/${id}`);
  }

  public getMatches(id: string) {
    return this.http.get(`${this.baseUrl}/tournaments/${id}/matches`);
  }

  public getGames() {
    return this.http.get<Game[]>(`${this.baseUrl}/games`);
  }

  public createGame(body: { name: string; imgUrl: string }) {
    return this.http.post(`${this.baseUrl}/games`, body);
  }

  public getUsers() {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  public getUser(id: string) {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  public patchUser(user: User) {
    return this.http.patch(`${this.baseUrl}/admin/users/${user._id}`, user);
  }

  public getRulesets() {
    return this.http.get<any[]>(`${this.baseUrl}/rulesets`);
  }

  public createRuleset(body: Partial<Ruleset>) {
    return this.http.post(`${this.baseUrl}/rulesets`, body);
  }

  public patchRuleset(ruleset: Partial<Ruleset>) {
    return this.http.patch(`${this.baseUrl}/rulesets/${ruleset.id}`, ruleset);
  }

  public getTeams(tournamentId: string) {
    return this.http.get<any[]>(
      `${this.baseUrl}/tournaments/${tournamentId}/teams`
    );
  }

  public getTeam(tournamentId: string, teamId: string) {
    return this.http.get<User>(
      `${this.baseUrl}/tournaments/${tournamentId}/teams/${teamId}`
    );
  }

  public getTickets() {
    return this.http.get<any>(`${this.baseUrl}/admin/tickets`);
  }

  public getTicket(id: string) {
    return this.http.get<any>(`${this.baseUrl}/tickets/${id}`);
  }
}
