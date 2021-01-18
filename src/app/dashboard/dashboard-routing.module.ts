import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { PlatformsComponent } from './platforms/platforms.component';
import { RulesetsComponent } from './rulesets/rulesets.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TournamentDetailComponent } from './tournament-detail/tournament-detail.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
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
    path: 'tickets/:id',
    component: TicketDetailComponent,
  },
  {
    path: 'rulesets',
    component: RulesetsComponent,
  },
  {
    path: 'games',
    component: GamesComponent,
  },
  {
    path: 'tournaments',
    component: TournamentsComponent,
  },
  {
    path: 'tournaments/:id',
    component: TournamentDetailComponent,
  },
  { path: '', redirectTo: 'users', pathMatch: 'full' }, // TODO: recreate a DashboardComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
