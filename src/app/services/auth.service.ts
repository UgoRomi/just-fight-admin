import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private apiService: ApiService) {}

  login(body: { email: string; password: string }) {
    return this.apiService.login(body).pipe(
      tap((res: { token: string; status: string }) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      })
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}
