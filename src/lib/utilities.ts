export function migrate(from: string, to: string) {
  const original = localStorage.getItem(from);
  if (original) {
    localStorage.setItem(to, original);
    localStorage.removeItem(from);
  }
}

export function minutesToString(minutes: number) {
  if (minutes >= 120) {
    const hours = (minutes / 60).toFixed(1);
    return hours + " hours";
  }
  return minutes + " " + (minutes === 1 ? "minute" : "minutes");
}
