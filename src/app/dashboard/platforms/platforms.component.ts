import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.scss']
})
export class PlatformsComponent implements OnInit {

  displayedColumns = ['name', 'show', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getPlatforms().subscribe()
  }

  addPlatform() {
    this.apiService.addPlatform({ name: 'orcozio', show: false}).subscribe()
  }

}

export interface PlatformElement {
  name: string;
  show: boolean;
}

const ELEMENT_DATA: PlatformElement[] = [
  {name: 'PS5', show: true},
  {name: 'PS4', show: true},
  {name: 'XBOX 360', show: true},
  {name: 'Nintendo Switch', show: true},
  {name: 'Nintendo Wii', show: true},
];