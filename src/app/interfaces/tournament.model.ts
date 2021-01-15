import { TournamentType } from './tournament-type.enum';

export interface Tournament {
  endsOn: string;
  game: string;
  id: string;
  imgUrl: string;
  name: string;
  numberOfTeams: number;
  ruleset: string;
  startsOn: string;
  type: TournamentType;
}
