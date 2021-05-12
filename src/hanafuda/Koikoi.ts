import Card from './Card'
import Player from './Player';

export default class Koikoi {

  private stage: Card[];
  private players: Player[];

  constructor() {
    this.initialize()
  }

  initialize(): void {
    this.stage = []
    this.players = []
  }

  start(): void {

  }

  pause(): void {

  }

  resume(): void {

  }

}
