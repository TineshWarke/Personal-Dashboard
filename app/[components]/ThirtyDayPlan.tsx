'use client';
import { useEffect, useState } from 'react';

const statusClasses = {
  success: 'bg-green-200 border-green-500',
  fail: 'bg-red-200 border-red-500',
  skipped: 'bg-yellow-200 border-yellow-500',
  none: 'bg-white',
};

const statusCycle: Array<'none' | 'success' | 'fail' | 'skipped'> = ['none', 'success', 'fail', 'skipped'];
const STORAGE_KEY = 'thirty_day_plan_statuses';

export default function ThirtyDayPlan() {
  const [dayStatuses, setDayStatuses] = useState<Array<'none' | 'success' | 'fail' | 'skipped'>>(
    Array(30).fill('none')
  );

  // Load data from localStorage on initial render
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length === 30) {
          setDayStatuses(parsed);
        }
      } catch {
        console.warn('Invalid JSON in localStorage');
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dayStatuses));
  }, [dayStatuses]);

  // Handle click
  const handleClick = (index: number) => {
    setDayStatuses((prev) => {
      const next = [...prev];
      const currentStatus = prev[index];
      const nextIndex = (statusCycle.indexOf(currentStatus) + 1) % statusCycle.length;
      next[index] = statusCycle[nextIndex];
      return next;
    });
  };

  return (
    <section className="bg-white p-4 rounded shadow space-y-4 no-select">
      <h2 className="text-lg font-semibold">30-Day Plan</h2>
      <div className="grid grid-cols-7 gap-2">
        {dayStatuses.map((status, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            className={`h-12 border rounded flex items-center justify-center cursor-pointer text-sm font-medium transition-all ${statusClasses[status]}`}
          >
            Day {i + 1}
          </div>
        ))}
      </div>
    </section>
  );
}
