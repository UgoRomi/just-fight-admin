import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from 'src/app/services/api.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Ruleset } from 'src/app/interfaces/ruleset.model';
import { Game } from 'src/app/interfaces/game.model';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Component({
  selector: 'app-rulesets',
  templateUrl: './rulesets.component.html',
  styleUrls: ['./rulesets.component.scss'],
})
export class RulesetsComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  removable = true;
  addOnBlur = true;

  patching = false;

  rulesets$ = this.apiService.getRulesets();
  games$ = this.apiService.getGames();

  //#region form
  form = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    game: ['', [Validators.required]],
    minNumberOfPlayersPerTeam: ['', [Validators.required, Validators.min(1)]],
    maxNumberOfPlayersPerTeam: ['', [Validators.required, Validators.min(1)]],
    maps: [[]],
    bestOf: [[], [Validators.required, Validators.min(1)]],
  });

  get name() {
    return this.form.get('name');
  }
  get description() {
    return this.form.get('description');
  }
  get game() {
    return this.form.get('game');
  }
  get minNumberOfPlayersPerTeam() {
    return this.form.get('minNumberOfPlayersPerTeam');
  }
  get maxNumberOfPlayersPerTeam() {
    return this.form.get('maxNumberOfPlayersPerTeam');
  }
  get maps() {
    return this.form.get('maps');
  }
  get bestOf() {
    return this.form.get('bestOf');
  }
  //#endregion form

  displayedColumns = [
    'name',
    'description',
    'minNumberOfPlayersPerTeam',
    'maxNumberOfPlayersPerTeam',
    'game',
    'actions',
  ];

  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  onChangeMinValue(value: string) {
    this.maxNumberOfPlayersPerTeam.setValidators([
      (control: AbstractControl) => Validators.min(parseInt(value))(control),
    ]);
  }

  onChangeMaxValue(value: string) {
    this.minNumberOfPlayersPerTeam.setValidators([
      (control: AbstractControl) => Validators.max(parseInt(value))(control),
    ]);
  }

  onSubmit() {
    const body = { ...this.form.value };

    if (this.patching) {
      this.rulesets$ = this.apiService.patchRuleset(body).pipe(
        tap(() => {
          this.resetForm();
        }),
        catchError((error) => {
          console.error(error);
          return of(error);
        }),
        switchMap(() => this.apiService.getRulesets())
      );

      return;
    }

    this.rulesets$ = this.apiService.createRuleset(body).pipe(
      tap(() => {
        this.resetForm();
      }),
      catchError((error) => {
        console.error(error);
        return of(error);
      }),
      switchMap(() => this.apiService.getRulesets())
    );
  }

  addChip(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    const maps = this.maps.value;

    if ((value || '').trim() && !maps.includes(value.trim())) {
      maps.push(value.trim());
      this.maps.setValue(maps);
    }

    if (input) {
      input.value = '';
    }
  }

  removeChip(map: string): void {
    const maps = this.maps.value;
    const index = maps.indexOf(map);

    if (index >= 0) {
      maps.splice(index, 1);
      this.maps.setValue(maps);
    }
  }

  resetForm() {
    this.form.reset();
    this.maps.setValue([]);
    this.patching = false;
  }

  patchRuleset(ruleset: Ruleset) {
    const patchingRuleset = { ...ruleset };
    patchingRuleset.game = (patchingRuleset.game as Partial<Game>).id;

    this.form.patchValue(patchingRuleset);
    this.patching = true;
  }
}
