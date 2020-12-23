import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { User } from 'src/app/interfaces/User';
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['username', 'email', 'actions'];

  userSubscription: Subscription;

  users$ = this.apiService.getUsers().pipe(
    map((res: any) =>
      res.users.map((el: any) => {
        return {
          username: el.username,
          email: el.email,
        };
      })
    ),
    tap((res: User[]) => {
      this.dataSource = new MatTableDataSource<User>(res);
      this.dataSource.paginator = this.paginator;
    })
  );

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.userSubscription = this.users$.subscribe();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
