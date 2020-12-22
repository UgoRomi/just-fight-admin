import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../services/api.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private apiService: ApiService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('body', this.router.getCurrentNavigation().extras.state);

    if (localStorage.getItem('token')) return true;
    
    const body = this.router.getCurrentNavigation().extras.state;

    if (!body || !body.email || !body.password) {
      this.router.navigate(['/login']);
      return false;
    }
    
    return this.apiService.login(body as {email: string, password: string}).pipe(
      tap((response: { token: string }) => {
        localStorage.setItem('token', response.token);
      }),
      map((response: { token: string }) => {
        if (response.token) {
          return true;
        }
        // this.router.navigate(['/dashboard']);
        return false;
      }),
      catchError((error) => {
        // this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
