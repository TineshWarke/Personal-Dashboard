'use client';
import { useEffect, useState } from 'react';

type JobEntry = {
    date: string;
    platform: string;
    count: number;
};

const STORAGE_KEY = 'job_platform_tracker';

export default function JobPlatformTracker() {
    const [entries, setEntries] = useState<JobEntry[]>([]);
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [platform, setPlatform] = useState('LinkedIn');
    const [count, setCount] = useState(1);

    // Load from localStorage on first render
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) setEntries(parsed);
            } catch {
                console.warn('Invalid job tracker data in localStorage');
            }
        }
    }, []);

    // Save on change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    }, [entries]);

    const addEntry = () => {
        if (!date || !platform || count <= 0) return;
        setEntries((prev) => [...prev, { date, platform, count }]);
        setCount(1);
    };

    // Group data for display
    const grouped = entries.reduce((acc, entry) => {
        if (!acc[entry.date]) acc[entry.date] = {};
        acc[entry.date][entry.platform] = (acc[entry.date][entry.platform] || 0) + entry.count;
        return acc;
    }, {} as Record<string, Record<string, number>>);

    const allDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
    const allPlatforms = Array.from(new Set(entries.map((e) => e.platform)));

    return (
        <section className="bg-white p-4 rounded shadow space-y-4">
            <h2 className="text-lg font-semibold">Job Applications by Platform</h2>

            {/* Add Entry Form */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border px-3 py-2 rounded"
                />
                <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="border px-3 py-2 rounded"
                >
                    <option>LinkedIn</option>
                    <option>Naukri</option>
                    <option>Direct-Application</option>
                    <option>Others</option>
                </select>
                <input
                    type="number"
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    className="border px-3 py-2 rounded w-24"
                    min={1}
                />
                <button onClick={addEntry} className="bg-gray-800 text-white px-4 py-2 rounded">
                    Add
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto h-48 overflow-y-scroll hide-scrollbar">
                <table className="w-full mt-4 text-sm border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="text-left p-2">Date</th>
                            {allPlatforms.map((p) => (
                                <th key={p} className="text-left p-2">{p}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {allDates.map((d) => (
                            <tr key={d} className="border-t">
                                <td className="p-2">{d}</td>
                                {allPlatforms.map((p) => (
                                    <td key={p} className="p-2">{grouped[d][p] || 0}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
