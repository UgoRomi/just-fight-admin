import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  goToDashboard(): void {
    const body: { email: string; password: string } = { ...this.form.value };
    this.authService.login(body).subscribe();
  }

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {}
}
