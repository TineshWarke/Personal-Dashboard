'use client';

import { useEffect, useState } from 'react';

type InterviewEntry = {
    date: string;
    company: string;
    role: string;
    resumeSent: boolean;
    oaCompleted: boolean;
    interviewScheduled: boolean;
    feedbackReceived: boolean;
    notes: string;
};

const STORAGE_KEY = 'interview_tracker_with_date';

export default function InterviewTracker() {
    const [entries, setEntries] = useState<InterviewEntry[]>([]);
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [resumeSent, setResumeSent] = useState(false);
    const [oaCompleted, setOaCompleted] = useState(false);
    const [interviewScheduled, setInterviewScheduled] = useState(false);
    const [feedbackReceived, setFeedbackReceived] = useState(false);
    const [notes, setNotes] = useState('');

    // Load on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) setEntries(parsed);
            } catch {
                console.warn('Invalid interview tracker data');
            }
        }
    }, []);

    // Save on change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    }, [entries]);

    const addEntry = () => {
        if (!date || !company || !role) return;

        const newEntry: InterviewEntry = {
            date,
            company,
            role,
            resumeSent,
            oaCompleted,
            interviewScheduled,
            feedbackReceived,
            notes,
        };

        const updated = [...entries, newEntry];
        setEntries(updated);

        // Reset
        setCompany('');
        setRole('');
        setResumeSent(false);
        setOaCompleted(false);
        setInterviewScheduled(false);
        setFeedbackReceived(false);
        setNotes('');
    };

    const sortedEntries = [...entries].sort((a, b) => b.date.localeCompare(a.date));

    return (
        <section className="bg-white p-4 rounded shadow space-y-4 h-72 overflow-y-scroll hide-scrollbar">
            <h2 className="text-lg font-semibold">Interview Tracker</h2>

            <div className="flex flex-col md:flex-row flex-wrap items-center gap-4">
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border px-3 py-2 rounded" />
                <input type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} className="border px-3 py-2 rounded" />
                <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} className="border px-3 py-2 rounded" />

                <label className="flex items-center gap-1 text-sm">
                    <input type="checkbox" checked={resumeSent} onChange={(e) => setResumeSent(e.target.checked)} />
                    Resume Sent
                </label>
                <label className="flex items-center gap-1 text-sm">
                    <input type="checkbox" checked={oaCompleted} onChange={(e) => setOaCompleted(e.target.checked)} />
                    OA Done
                </label>
                <label className="flex items-center gap-1 text-sm">
                    <input type="checkbox" checked={interviewScheduled} onChange={(e) => setInterviewScheduled(e.target.checked)} />
                    Interview Scheduled
                </label>
                <label className="flex items-center gap-1 text-sm">
                    <input type="checkbox" checked={feedbackReceived} onChange={(e) => setFeedbackReceived(e.target.checked)} />
                    Feedback Received
                </label>

                <input type="text" placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="border px-3 py-2 rounded w-full md:w-60" />

                <button onClick={addEntry} className="bg-green-600 text-white px-4 py-2 rounded">
                    Add
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full mt-4 text-sm border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 text-left">Date</th>
                            <th className="p-2 text-left">Company</th>
                            <th className="p-2 text-left">Role</th>
                            <th className="p-2 text-left">Resume</th>
                            <th className="p-2 text-left">OA</th>
                            <th className="p-2 text-left">Interview</th>
                            <th className="p-2 text-left">Feedback</th>
                            <th className="p-2 text-left">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedEntries.map((entry, i) => (
                            <tr key={`${entry.date}-${entry.company}-${i}`} className="border-t">
                                <td className="p-2">{entry.date}</td>
                                <td className="p-2">{entry.company}</td>
                                <td className="p-2">{entry.role}</td>
                                <td className="p-2">{entry.resumeSent ? '✅' : '❌'}</td>
                                <td className="p-2">{entry.oaCompleted ? '✅' : '❌'}</td>
                                <td className="p-2">{entry.interviewScheduled ? '✅' : '❌'}</td>
                                <td className="p-2">{entry.feedbackReceived ? '✅' : '❌'}</td>
                                <td className="p-2">{entry.notes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}