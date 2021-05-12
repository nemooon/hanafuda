import { createStore } from 'vuex'
import Chance from 'chance';
import Card from './Card';
import cards from './cards';
import Player from './Player';

const chance = new Chance()

export class Choice {
  public player: Player;
  public card: Card;

  constructor(player: Player, card: Card) {
    this.player = player
    this.card = card
  }

  value() {
    return this.card.month;
  }
}

export default class DecideDealer {

  private stage: Card[];
  private players: Player[];
  private choices: Choice[];
  private dealer: Player;

  constructor(players: Player[]) {
    this.players = players

    this.initialize()
  }

  initialize(): void {
    this.stage = []
    this.choices = []
    for (let i = 0; i < this.players.length; i++) {
      this.stage.push(chance.falsy({ pool: cards }))
    }
  }

  choice(index: number): void {
    const player = this.players[this.choices.length]
    const card = this.stage[index]
    this.choices.push(new Choice(player, card))
  }

  decide(): Player {
    this.choices.sort((a: Choice, b: Choice): number => {
      return a.value() - b.value();
    })

    this.dealer = this.choices[0].player

    return this.dealer
  }

}
