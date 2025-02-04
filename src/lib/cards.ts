export type Rank =
  | "A"
  | "K"
  | "Q"
  | "J"
  | "10"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2"
  | string;
export type Suit = "D" | "C" | "H" | "S";

interface Card {
  rank: Rank;
  suit: Suit;
}

export class Deck {
  #deck = [
    {
      suit: "D",
      rank: "2",
      quantity: 1,
    },
    {
      suit: "D",
      rank: "3",
      quantity: 1,
    },
    {
      suit: "D",
      rank: "4",
      quantity: 1,
    },
    {
      suit: "D",
      rank: "5",
      quantity: 1,
    },
    {
      suit: "D",
      rank: "6",
      quantity: 1,
    },
    {
      suit: "D",
      rank: "7",
      quantity: 1,
    },
    {
      suit: "D",
      rank: "8",
      quantity: 1,
    },
    {
      suit: "D",
      rank: "9",
      quantity: 1,
    },
    {
      suit: "D",
      rank: "10",
      quantity: 1,
    },
    {
      suit: "D",
      rank: "A",
      quantity: 1,
    },
    {
      suit: "D",
      rank: "K",
      quantity: 1,
    },
    {
      suit: "D",
      rank: "Q",
      quantity: 1,
    },
    {
      suit: "D",
      rank: "J",
      quantity: 1,
    },
    {
      suit: "C",
      rank: "2",
      quantity: 1,
    },
    {
      suit: "C",
      rank: "3",
      quantity: 1,
    },
    {
      suit: "C",
      rank: "4",
      quantity: 1,
    },
    {
      suit: "C",
      rank: "5",
      quantity: 1,
    },
    {
      suit: "C",
      rank: "6",
      quantity: 1,
    },
    {
      suit: "C",
      rank: "7",
      quantity: 1,
    },
    {
      suit: "C",
      rank: "8",
      quantity: 1,
    },
    {
      suit: "C",
      rank: "9",
      quantity: 1,
    },
    {
      suit: "C",
      rank: "10",
      quantity: 1,
    },
    {
      suit: "C",
      rank: "A",
      quantity: 1,
    },
    {
      suit: "C",
      rank: "K",
      quantity: 1,
    },
    {
      suit: "C",
      rank: "Q",
      quantity: 1,
    },
    {
      suit: "C",
      rank: "J",
      quantity: 1,
    },
    {
      suit: "H",
      rank: "2",
      quantity: 1,
    },
    {
      suit: "H",
      rank: "3",
      quantity: 1,
    },
    {
      suit: "H",
      rank: "4",
      quantity: 1,
    },
    {
      suit: "H",
      rank: "5",
      quantity: 1,
    },
    {
      suit: "H",
      rank: "6",
      quantity: 1,
    },
    {
      suit: "H",
      rank: "7",
      quantity: 1,
    },
    {
      suit: "H",
      rank: "8",
      quantity: 1,
    },
    {
      suit: "H",
      rank: "9",
      quantity: 1,
    },
    {
      suit: "H",
      rank: "10",
      quantity: 1,
    },
    {
      suit: "H",
      rank: "A",
      quantity: 1,
    },
    {
      suit: "H",
      rank: "K",
      quantity: 1,
    },
    {
      suit: "H",
      rank: "Q",
      quantity: 1,
    },
    {
      suit: "H",
      rank: "J",
      quantity: 1,
    },
    {
      suit: "S",
      rank: "2",
      quantity: 1,
    },
    {
      suit: "S",
      rank: "3",
      quantity: 1,
    },
    {
      suit: "S",
      rank: "4",
      quantity: 1,
    },
    {
      suit: "S",
      rank: "5",
      quantity: 1,
    },
    {
      suit: "S",
      rank: "6",
      quantity: 1,
    },
    {
      suit: "S",
      rank: "7",
      quantity: 1,
    },
    {
      suit: "S",
      rank: "8",
      quantity: 1,
    },
    {
      suit: "S",
      rank: "9",
      quantity: 1,
    },
    {
      suit: "S",
      rank: "10",
      quantity: 1,
    },
    {
      suit: "S",
      rank: "A",
      quantity: 1,
    },
    {
      suit: "S",
      rank: "K",
      quantity: 1,
    },
    {
      suit: "S",
      rank: "Q",
      quantity: 1,
    },
    {
      suit: "S",
      rank: "J",
      quantity: 1,
    },
  ];

  constructor() {
    return this;
  }

  draw(): Card | undefined {
    const remaining = this.#deck.filter((card) => card.quantity > 0);
    if (remaining.length <= 0) return;
    const random = Math.floor(Math.random() * remaining.length);
    remaining[random].quantity--;
    return {
      rank: remaining[random].rank as Rank,
      suit: remaining[random].suit as Suit,
    };
  }

  reset(): void {
    this.#deck.forEach((card) => {
      card.quantity = 1;
    });
  }

  get remaining() {
    const remaining = this.#deck.filter((card) => card.quantity > 0);
    return remaining.length;
  }
}
