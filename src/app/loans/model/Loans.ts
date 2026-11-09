import { Clients } from "../../clients/model/clients";
import { Game } from "../../game/model/Game";

export interface Loans {
    id: number;
    game: Game;
    client: Clients;
    iniDate: string;
    devDate: string;
}
