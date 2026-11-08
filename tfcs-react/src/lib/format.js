/** 1 -> "01" */
export const pad2 = (n) => String(n).padStart(2, '0');

const WORDS = [
  'Zero',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
];
/** 9 -> "Nine" (falls back to the number above twelve) */
export const numberWord = (n) => WORDS[n] ?? String(n);

/** Today's date as YYYY-MM-DD in the visitor's local time. */
export function todayISO() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

/** "2026-11-06" -> "Today" or "Fri 6 Nov" */
export function niceDate(iso) {
  if (!iso) return '';
  if (iso === todayISO()) return 'Today';
  return new Date(`${iso}T00:00`).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}
