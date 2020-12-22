import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  
  title = 'just-fight-admin';

  public logout(): void {
    console.log('logout event');
  }

  ngOnInit(): void {
  }

}
