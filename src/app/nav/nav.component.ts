import { Component, OnInit } from '@angular/core';

interface NavLink {
  route: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  links: NavLink[] = [
    {
      route: 'users',
      label: 'Users',
      icon: 'people'
    },
    {
      route: 'teams',
      label: 'Teams',
      icon: 'store'
    },
    {
      route: 'tournaments',
      label: 'Tournaments',
      icon: 'addchart'
    },
    {
      route: 'platforms',
      label: 'Platforms',
      icon: 'addchart'
    },
    {
      route: 'games',
      label: 'Games',
      icon: 'addchart'
    },
    {
      route: 'tickets',
      label: 'Tickets',
      icon: 'addchart'
    }
  ]
  
  constructor() { }

  public logout(): void {
    console.log('logout event');
  }

  ngOnInit(): void {
  }

}
