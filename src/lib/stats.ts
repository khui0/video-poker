import { writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";

const NAME = "stats";

const stored = browser && localStorage.getItem(NAME);

interface Stats {
  gamesPlayed: number;
  minutesPlayed: number;
  bestAmount: number;
  bestHand: {
    type: string;
    score: number;
  };
}

const initial: Stats = {
  gamesPlayed: 0,
  minutesPlayed: 0,
  bestAmount: 0,
  bestHand: {
    type: "high-card",
    score: 0,
  },
};

export const stats: Writable<Stats> = writable(
  Object.assign(initial, stored && JSON.parse(stored)),
);

export function reset() {
  stats.set(initial);
}

stats.subscribe((value) => {
  if (browser) {
    return (localStorage[NAME] = JSON.stringify(value));
  }
});
