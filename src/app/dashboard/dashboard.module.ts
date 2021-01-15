import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { AddTournamentComponent } from './tournaments/components/add-tournament/add-tournament.component';
import { GamesComponent } from './games/games.component';
import { MaterialModule } from '../material-module';
import { NavComponent } from '../nav/nav.component';
import { UsersComponent } from './users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TournamentDetailComponent } from './tournament-detail/tournament-detail.component';
import { RulesetsComponent } from './rulesets/rulesets.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TournamentsComponent,
    AddTournamentComponent,
    GamesComponent,
    UsersComponent,
    NavComponent,
    TournamentDetailComponent,
    RulesetsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class DashboardModule {}
