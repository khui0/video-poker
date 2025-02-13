import { writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";

interface Settings {
  [key: string]: string;
}

const storedSettings = browser && localStorage.getItem("settings");

const defaultSettings: Settings = {
  maxBet: "false",
};

// Initialize store with default settings
export const settings: Writable<Settings> = writable(
  Object.assign({}, defaultSettings, JSON.parse(storedSettings || "[]")),
);

export function resetSettings() {
  settings.set(defaultSettings);
}

settings.subscribe((value) => {
  if (browser) {
    return (localStorage.settings = JSON.stringify(value));
  }
});
