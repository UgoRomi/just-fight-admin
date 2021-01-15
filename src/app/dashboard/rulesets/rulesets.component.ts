import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from 'src/app/services/api.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Ruleset } from 'src/app/interfaces/ruleset.model';
import { Game } from 'src/app/interfaces/game.model';

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

  games$ = this.apiService.getGames();

  //#region form
  form = this.fb.group({
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

  dataSource;

  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.apiService.getRulesets().subscribe((res) => (this.dataSource = res));
  }

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
    console.log('form', this.form.valid, this.form.value);
    if (this.patching) {
      this.apiService
        .createRuleset(this.form.value)
        .subscribe(() => (this.patching = false));
      return;
    }

    this.apiService.createRuleset(this.form.value).subscribe();
  }

  add(event: MatChipInputEvent): void {
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

  remove(map: string): void {
    const maps = this.maps.value;
    const index = maps.indexOf(map);

    if (index >= 0) {
      maps.splice(index, 1);
      this.maps.setValue(maps);
    }
  }

  resetForm() {
    this.form.reset();
    this.patching = false;
  }

  patchRuleset(ruleset: Ruleset) {
    console.log(ruleset);

    const patchingRuleset = { ...ruleset };
    patchingRuleset.game = (patchingRuleset.game as Partial<Game>).id;

    this.form.patchValue(patchingRuleset);
    this.patching = true;
  }
}
