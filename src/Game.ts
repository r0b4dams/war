import { Deck, type Card } from "./Deck";
import { VALUES } from "./utils";

interface Board {
  playerDeckArea: HTMLDivElement;
  playerCardArea: HTMLDivElement;
  computerDeckArea: HTMLDivElement;
  computerCardArea: HTMLDivElement;
  textArea: HTMLDivElement;
}

export class Game {
  private board: Board;
  private playerDeck: Deck;
  private computerDeck: Deck;
  private playing = false;
  private stop = false;

  constructor() {
    const [playerDeck, computerDeck] = new Deck().shuffle().divide();
    this.playerDeck = playerDeck;
    this.computerDeck = computerDeck;

    this.board = {
      playerDeckArea: document.querySelector(".player.deck")!,
      playerCardArea: document.querySelector(".player.card-area")!,
      computerDeckArea: document.querySelector(".computer.deck")!,
      computerCardArea: document.querySelector(".computer.card-area")!,
      textArea: document.querySelector(".text")!,
    };

    document.addEventListener("click", () => {
      if (this.stop) {
        this.stop = false;
        this.start();
        return;
      }

      if (this.playing) {
        this.clean();
      } else {
        this.flip();
      }
    });
  }

  start() {
    const [playerDeck, computerDeck] = new Deck().shuffle().divide();
    this.playerDeck = playerDeck;
    this.computerDeck = computerDeck;
    this.update();
  }

  clean() {
    this.playing = false;
    this.board.playerCardArea.innerHTML = "";
    this.board.computerCardArea.innerHTML = "";
    this.board.textArea.innerText = "";
    this.update();
  }

  flip() {
    this.playing = true;
    const playerCard = this.computerDeck!.pop()!;
    const computerCard = this.playerDeck!.pop()!;
    this.board.playerCardArea.append(playerCard.html);
    this.board.computerCardArea.append(computerCard.html);
    this.update();

    if (this.winner(playerCard, computerCard)) {
      this.board.textArea.innerText = "Win";
      this.playerDeck.push(playerCard);
      this.playerDeck.push(computerCard);
    } else if (this.winner(computerCard, playerCard)) {
      this.board.textArea.innerText = "Lose";
      this.computerDeck.push(playerCard);
      this.computerDeck.push(computerCard);
    } else {
      this.board.textArea.innerText = "Draw";
      this.playerDeck.push(playerCard);
      this.computerDeck.push(computerCard);
    }

    if (this.gameover(this.playerDeck)) {
      this.board.textArea.innerText = "You lost the war.";
      this.stop = true;
    } else if (this.gameover(this.computerDeck)) {
      this.board.textArea.innerText = "You won the war!";
      this.stop = true;
    }
  }

  gameover(deck: Deck) {
    return deck.size === 0;
  }

  update() {
    this.board.playerDeckArea.innerText = this.playerDeck.size.toString();
    this.board.computerDeckArea.innerText = this.computerDeck.size.toString();
  }

  winner(card1: Card, card2: Card) {
    return VALUES[card1.value] > VALUES[card2.value];
  }
}
