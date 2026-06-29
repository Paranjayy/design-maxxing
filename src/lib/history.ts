const HIST_KEY = "dm-history";
const MAX_ENTRIES = 20;

interface HistoryEntry {
  id: string;
  timestamp: number;
}

function readHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeHistory(entries: HistoryEntry[]) {
  localStorage.setItem(HIST_KEY, JSON.stringify(entries));
}

export function addToHistory(id: string) {
  const entries = readHistory();
  // Remove existing entry for this id to move it to the top
  const filtered = entries.filter((e) => e.id !== id);
  // Add new entry at the beginning
  filtered.unshift({ id, timestamp: Date.now() });
  // Keep only the last MAX_ENTRIES
  writeHistory(filtered.slice(0, MAX_ENTRIES));
}

export function getHistory(): string[] {
  return readHistory()
    .sort((a, b) => b.timestamp - a.timestamp)
    .map((e) => e.id);
}

export function getHistoryWithTimestamps(): HistoryEntry[] {
  return readHistory().sort((a, b) => b.timestamp - a.timestamp);
}

export function clearHistory() {
  localStorage.removeItem(HIST_KEY);
  window.dispatchEvent(new Event("dm-history-changed"));
}
