import { SUITS, VALUES } from "./utils";

export class Card {
  constructor(public suit: string, public value: string) {}

  get html() {
    const div = document.createElement("div");
    div.innerText = this.suit;
    div.classList.add("card", this.color);
    div.dataset.value = `${this.value} ${this.suit}`;
    return div;
  }

  get color() {
    return this.suit == "♥" || this.suit == "♦" ? "red" : "black";
  }
}

export class Deck {
  constructor(public cards: Card[] = Deck.new()) {}

  public static new() {
    return SUITS.flatMap((suit) =>
      Object.keys(VALUES).map((value) => new Card(suit, value))
    );
  }

  get size() {
    return this.cards.length;
  }

  shuffle() {
    for (let i = this.size - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
    return this;
  }

  divide() {
    const mid = Math.ceil(this.size / 2);
    return [
      new Deck(this.cards.slice(0, mid)),
      new Deck(this.cards.slice(mid, this.size)),
    ];
  }

  pop() {
    return this.cards.shift();
  }

  push(card: Card) {
    this.cards.push(card);
  }
}
