import type { Rank, Suit } from "./cards";

export const POKER_HANDS: {
  [key: string]: {
    name: string;
    mult: number;
  };
} = {
  "royal-flush": {
    name: "Royal Flush",
    mult: 100,
  },
  "straight-flush": {
    name: "Stright Flush",
    mult: 50,
  },
  "four-kind": {
    name: "Four of a Kind",
    mult: 20,
  },
  "full-house": {
    name: "Full House",
    mult: 10,
  },
  flush: {
    name: "Flush",
    mult: 8,
  },
  straight: {
    name: "Straight",
    mult: 6,
  },
  "three-kind": {
    name: "Three of a Kind",
    mult: 3,
  },
  "two-pair": {
    name: "Two Pair",
    mult: 2,
  },
  pair: {
    name: "Pair",
    mult: 1,
  },
  "high-card": {
    name: "High Card",
    mult: 0,
  },
};

export function checkHand(hand: { rank: Rank; suit: Suit }[]) {
  const sorted = hand.toSorted((a, b) => rankToValue(a.rank) - rankToValue(b.rank));
  const flush = hand.every((card) => card.suit === hand[0].suit);
  const straight = isConsecutive(sorted.map((card) => rankToValue(card.rank)));
  const lowSorted = hand.toSorted(
    (a, b) => toLowAce(rankToValue(a.rank)) - toLowAce(rankToValue(b.rank)),
  );
  const lowStraight = isConsecutive(lowSorted.map((card) => rankToValue(card.rank)));
  const kinds = countKinds(hand);

  if (flush) {
    if (sorted[sorted.length - 1].rank === "A" && straight) return "royal-flush";
    if (straight || lowStraight) return "straight-flush";
    return "flush";
  }
  if (straight) return "straight";
  if (kinds[0].count === 4) return "four-kind";
  if (kinds[0].count === 3) {
    if (kinds[1].count === 2) return "full-house";
    return "three-kind";
  }
  if (kinds[0].count === 2) {
    if (kinds[1].count === 2) return "two-pair";
    return "pair";
  }
  return "high-card";
}

function rankToValue(rank: Rank): number {
  const values: { [key: string]: number } = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
  };
  if (rank in values) {
    return values[rank];
  }
  return parseInt(rank);
}

function toLowAce(rank: number): number {
  if (rank === 14) return 1;
  return rank;
}

function isConsecutive(array: number[]): boolean {
  for (let i = 1; i < array.length; i++) {
    if (array[i - 1] + 1 !== array[i]) return false;
  }
  return true;
}

function countKinds(hand: { rank: Rank }[]) {
  const counts: { [key: string]: number } = {};
  for (let i = 0; i < hand.length; i++) {
    const index = hand[i].rank;
    counts[index] ??= 0;
    counts[index]++;
  }
  return Object.entries(counts)
    .toSorted((a, b) => b[1] - a[1])
    .map((item) => {
      return {
        rank: item[0],
        count: item[1],
      };
    });
}
