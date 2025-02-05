import { writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";

interface Stats {
  bestAmount: number;
  bestHand: {
    type: string;
    score: number;
  };
}

const NAME = "stats";

const stored = browser && localStorage.getItem(NAME);

const initial: Stats = {
  bestAmount: 0,
  bestHand: {
    type: "",
    score: 0,
  },
};

// Initialize store with default settings
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
