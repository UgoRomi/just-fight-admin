import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TournamentType } from 'src/app/interfaces/tournament-type.enum';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-tournament',
  templateUrl: './add-tournament.component.html',
  styleUrls: ['./add-tournament.component.scss'],
})
export class AddTournamentComponent implements OnInit {
  //#region form
  form = this.fb.group({
    name: ['', [Validators.required]],
    game: ['', [Validators.required]],
    platform: ['', [Validators.required]],
    show: ['', [Validators.required]],
    startsOn: ['', [Validators.required]],
    endsOn: ['', [Validators.required]],
    ruleset: ['', [Validators.required]],
    type: ['', [Validators.required]],
    open: ['', [Validators.required]],
    imgUrl: ['', []],
    imgBase64: ['', []],
  });

  get name() {
    return this.form.get('name');
  }
  get game() {
    return this.form.get('game');
  }
  get platform() {
    return this.form.get('platform');
  }
  get show() {
    return this.form.get('show');
  }
  get startsOn() {
    return this.form.get('startsOn');
  }
  get endsOn() {
    return this.form.get('endsOn');
  }
  get ruleset() {
    return this.form.get('ruleset');
  }
  get type() {
    return this.form.get('type');
  }
  get open() {
    return this.form.get('open');
  }
  get imgUrl() {
    return this.form.get('imgUrl');
  }
  get imgBase64() {
    return this.form.get('imgBase64');
  }
  //#endregion form

  tournamentType = TournamentType;
  games$ = this.apiService.getGames();
  platforms$ = this.apiService.getPlatforms();
  rulesets$ = this.apiService.getRulesets();

  srcResult: ArrayBuffer;
  fileName = '';

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {}

  onSubmit() {
    const body = { ...this.form.value };

    body.startsOn = body.startsOn.toISOString().split('T')[0];
    body.endsOn = body.endsOn.toISOString().split('T')[0];

    this.apiService.createTournament(body).subscribe();
  }

  getTournamentTypes() {
    return Object.keys(this.tournamentType);
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fileName = inputNode.files[0].name;
        let base64String = btoa(
          String.fromCharCode(...new Uint8Array(e.target.result))
        );

        this.imgBase64.setValue(base64String);
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}
