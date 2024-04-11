const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

class Card {
  constructor(public suit: string, public value: string) {}
}

export class Deck {
  private cards: Card[];
  constructor() {
    this.cards = Deck.new();
    this.shuffle();
  }

  get size() {
    return this.cards.length;
  }

  static new() {
    return SUITS.flatMap((suit) =>
      VALUES.map((value) => new Card(suit, value))
    );
  }

  shuffle() {
    for (let i = this.size - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
}
