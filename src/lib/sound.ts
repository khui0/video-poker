import { Howl } from "howler";

import main0 from "$lib/assets/main0.webm";
import main1 from "$lib/assets/main1.webm";
import main2 from "$lib/assets/main2.webm";
import main3 from "$lib/assets/main3.webm";
import coin0 from "$lib/assets/coin0.webm";
import coin1 from "$lib/assets/coin1.webm";
import coin2 from "$lib/assets/coin2.webm";
import coin3 from "$lib/assets/coin3.webm";
import coin4 from "$lib/assets/coin4.webm";
import coin5 from "$lib/assets/coin5.webm";
import coin6 from "$lib/assets/coin6.webm";
import card0 from "$lib/assets/card0.webm";
import card1 from "$lib/assets/card1.webm";
import card2 from "$lib/assets/card2.webm";

let theme: Howl | undefined;
let themeMuted: boolean = false;

function autoplay(i: number, list: string[]) {
  theme = new Howl({
    src: [list[i]],
    html5: true,
    volume: themeMuted ? 0 : 0.5,
    onend: function () {
      if (i + 1 == list.length) {
        autoplay(0, list);
      } else {
        autoplay(i + 1, list);
      }
    },
  });
  theme.play();
  console.log("playing", list[i]);
}

const coins = [
  new Howl({
    src: coin0,
  }),
  new Howl({
    src: coin1,
  }),
  new Howl({
    src: coin2,
  }),
  new Howl({
    src: coin3,
  }),
  new Howl({
    src: coin4,
  }),
  new Howl({
    src: coin5,
  }),
  new Howl({
    src: coin6,
  }),
];

const cards = [
  new Howl({
    src: card0,
  }),
  new Howl({
    src: card1,
  }),
  new Howl({
    src: card2,
  }),
];

export function playTheme() {
  if (!theme || !theme.playing()) {
    autoplay(0, [main0, main1, main2, main3]);
  }
}

export function skipTheme() {
  if (theme) {
    theme.seek(theme.duration());
  }
}

export function pauseTheme() {
  themeMuted = true;
  if (theme) {
    theme.volume(0);
  }
}

export function resumeTheme() {
  themeMuted = false;
  if (theme) {
    theme.volume(0.5);
  }
}

export function playCoin() {
  const index = Math.floor(Math.random() * coins.length);
  coins[index].play();
}

export function playCard() {
  const index = Math.floor(Math.random() * cards.length);
  cards[index].play();
}
