import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Game } from 'src/app/interfaces/game.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  patching = false;

  games$ = this.apiService.getGames();

  displayedColumns = ['name', 'img', 'actions'];

  form = this.fb.group({
    name: ['', [Validators.required]],
    imgUrl: ['', [Validators.required]],
  });

  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  ngOnInit() {}

  onSubmit() {
    const body = { ...this.form.value };

    // TODO: patch game missing
    // if (this.patching) {
    //   return;
    // }

    this.games$ = this.apiService
      .createGame(body)
      .pipe(switchMap(() => this.apiService.getGames()));
  }

  patchGame(game: Game) {
    const patchingGame = { ...game };

    this.form.patchValue(patchingGame);
    this.patching = true;
  }

  resetForm() {
    this.form.reset();
    this.patching = false;
  }
}
