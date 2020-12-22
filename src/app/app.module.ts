import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { LoginComponent } from './login/login.component';
import { TeamsComponent } from './dashboard/teams/teams.component';
import { UsersComponent } from './dashboard/users/users.component';
import { TicketsComponent } from './dashboard/tickets/tickets.component';
import { TournamentsComponent } from './dashboard/tournaments/tournaments.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PlatformsComponent } from './dashboard/platforms/platforms.component';
import { GamesComponent } from './dashboard/games/games.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TeamsComponent,
    UsersComponent,
    TicketsComponent,
    TournamentsComponent,
    PlatformsComponent,
    GamesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
