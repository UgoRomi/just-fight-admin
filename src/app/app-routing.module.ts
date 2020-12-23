import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { GamesComponent } from './dashboard/games/games.component';
import { PlatformsComponent } from './dashboard/platforms/platforms.component';
import { TeamsComponent } from './dashboard/teams/teams.component';
import { TicketsComponent } from './dashboard/tickets/tickets.component';
import { TournamentsComponent } from './dashboard/tournaments/tournaments.component';
import { UsersComponent } from './dashboard/users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
// import { IsAuthenticatedGuard } from './is-authenticated-guard';
// import { IsAuthenticatedPharmaGuard } from './is-authenticated-pharma.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'teams',
        component: TeamsComponent,
      },
      {
        path: 'platforms',
        component: PlatformsComponent,
      },
      {
        path: 'tickets',
        component: TicketsComponent,
      },
      {
        path: 'games',
        component: GamesComponent,
      },
      {
        path: 'tournaments',
        component: TournamentsComponent,
      },
    ],
  },
  { path: '**', component: LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
