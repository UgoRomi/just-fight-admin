import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { PlatformsComponent } from './platforms/platforms.component';
import { RulesetsComponent } from './rulesets/rulesets.component';
import { TeamsComponent } from './teams/teams.component';
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
