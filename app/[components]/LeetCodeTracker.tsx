'use client';
import { useEffect, useState } from 'react';

type LeetCodeEntry = {
  date: string;
  easy: number;
  medium: number;
  hard: number;
};

const STORAGE_KEY = 'leetcode_tracker_with_date';

export default function LeetCodeTrackerWithDate() {
  const [entries, setEntries] = useState<LeetCodeEntry[]>([]);
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [easy, setEasy] = useState(0);
  const [medium, setMedium] = useState(0);
  const [hard, setHard] = useState(0);

  // Load data on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setEntries(parsed);
      } catch {
        console.warn('Invalid LeetCode tracker data');
      }
    }
  }, []);

  // Save data on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (!date) return;
    const existingIndex = entries.findIndex((e) => e.date === date);
    const newEntry = { date, easy, medium, hard };
    if (existingIndex >= 0) {
      const updated = [...entries];
      updated[existingIndex] = newEntry;
      setEntries(updated);
    } else {
      setEntries((prev) => [...prev, newEntry]);
    }

    // Reset
    setEasy(0);
    setMedium(0);
    setHard(0);
  };

  const sortedEntries = [...entries].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="text-lg font-semibold">LeetCode Daily Tracker</h2>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Easy"
          value={easy}
          onChange={(e) => setEasy(Number(e.target.value))}
          className="border px-3 py-2 rounded w-24"
          min={0}
        />
        <input
          type="number"
          placeholder="Medium"
          value={medium}
          onChange={(e) => setMedium(Number(e.target.value))}
          className="border px-3 py-2 rounded w-24"
          min={0}
        />
        <input
          type="number"
          placeholder="Hard"
          value={hard}
          onChange={(e) => setHard(Number(e.target.value))}
          className="border px-3 py-2 rounded w-24"
          min={0}
        />
        <button
          onClick={addEntry}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto h-48 overflow-y-scroll hide-scrollbar">
        <table className="w-full mt-4 text-sm border">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Easy</th>
              <th className="text-left p-2">Medium</th>
              <th className="text-left p-2">Hard</th>
            </tr>
          </thead>
          <tbody>
            {sortedEntries.map((entry) => (
              <tr key={entry.date} className="border-t">
                <td className="p-2">{entry.date}</td>
                <td className="p-2">{entry.easy}</td>
                <td className="p-2">{entry.medium}</td>
                <td className="p-2">{entry.hard}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
