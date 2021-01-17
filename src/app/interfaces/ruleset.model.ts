import { Game } from './game.model';

export interface Ruleset {
  id: string;
  name: string;
  description: string;
  game: string | Partial<Game>;
  maxNumberOfPlayersPerTeam: number;
  minNumberOfPlayersPerTeam: number;
  maps: string[];
}
