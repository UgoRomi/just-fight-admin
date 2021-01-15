import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

interface NavLink {
  route: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  links: NavLink[] = environment.links;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  public logout(): void {
    this.authService.logout();
  }
}
