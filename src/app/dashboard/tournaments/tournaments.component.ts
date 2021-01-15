import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Tournament } from 'src/app/interfaces/tournament.model';
import { ApiService } from 'src/app/services/api.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class TournamentsComponent implements OnInit {
  dataSource: MatTableDataSource<Tournament>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['name', 'type', 'startsOn'];
  expandedElement: Tournament | null;

  tournamentSubscription: Subscription;

  tournaments$ = this.apiService.getTournaments().pipe(
    tap((res: Tournament[]) => {
      this.dataSource = new MatTableDataSource<Tournament>(res);
      this.dataSource.paginator = this.paginator;
    })
  );

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.tournamentSubscription = this.tournaments$.subscribe();
  }

  ngOnDestroy(): void {
    this.tournamentSubscription.unsubscribe();
  }
}
