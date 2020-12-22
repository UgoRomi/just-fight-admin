import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  goToDashboard(): void {
    const body = {
      email: this.email.value,
      password: this.password.value
    }
    this.router.navigate(['/dashboard'], { state: body });
  }

  constructor(private fb: FormBuilder, private router : Router) {}

  ngOnInit(): void {
  }
}
