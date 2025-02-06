export function migrate(from: string, to: string) {
  const original = localStorage.getItem(from);
  if (original) {
    localStorage.setItem(to, original);
    localStorage.removeItem(from);
  }
}
