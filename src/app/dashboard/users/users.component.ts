import { Component, OnInit, ViewChild } from '@angular/core';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/interfaces/user.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['username', 'email', 'actions'];

  initPaginator = tap((res: User[]) => {
    this.dataSource = new MatTableDataSource<User>(res);
    this.dataSource.paginator = this.paginator;
  });

  users$ = this.apiService.getUsers().pipe(this.initPaginator);

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  verifyUser(user: User) {
    const patchedUser = { ...user };
    patchedUser.status = 'VERIFIED';

    this.users$ = this.apiService.patchUser(patchedUser).pipe(
      catchError((error) => {
        console.error(error);
        return of(error);
      }),
      switchMap(() => this.apiService.getUsers().pipe(this.initPaginator))
    );
  }
}
