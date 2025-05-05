'use client';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'job_dashboard_notes';

const colorOptions = [
    { name: 'Urgent', className: 'bg-red-100 border-red-400 text-red-800', value: 'red' },
    { name: 'Reminder', className: 'bg-yellow-100 border-yellow-400 text-yellow-800', value: 'yellow' },
    { name: 'Idea', className: 'bg-blue-100 border-blue-400 text-blue-800', value: 'blue' },
    { name: 'Success', className: 'bg-green-100 border-green-400 text-green-800', value: 'green' },
    { name: 'Personal', className: 'bg-purple-100 border-purple-400 text-purple-800', value: 'purple' },
];

interface Note {
    text: string;
    color: string;
}

export default function NotesSection() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [newNote, setNewNote] = useState('');
    const [selectedColor, setSelectedColor] = useState('yellow');

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) setNotes(parsed);
            } catch {
                console.warn('Invalid notes format');
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }, [notes]);

    const addNote = () => {
        if (!newNote.trim()) return;
        const newNoteObj: Note = { text: newNote.trim(), color: selectedColor };
        setNotes((prev) => [newNoteObj, ...prev]);
        setNewNote('');
    };

    const deleteNote = (index: number) => {
        setNotes((prev) => prev.filter((_, i) => i !== index));
    };

    const getColorClass = (color: string) => {
        return colorOptions.find((c) => c.value === color)?.className || 'bg-gray-100';
    };

    return (
        <section className="p-4 rounded shadow bg-white space-y-4 h-60 overflow-y-scroll hide-scrollbar">
            <h2 className="text-xl font-semibold">📒 Notes</h2>

            {/* Color Legend */}
            <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-semibold text-gray-700 mr-2">Legend:</span>
                {colorOptions.map((color) => (
                    <div
                        key={color.value}
                        className={`px-2 py-1 text-xs font-medium rounded ${color.className}`}
                    >
                        {color.name}
                    </div>
                ))}
            </div>

            {/* Add Note */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <textarea
                    placeholder="Write your note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 border px-3 py-2 rounded max-h-14 min-h-14"
                />
                <select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="border px-2 py-2 rounded text-sm"
                >
                    {colorOptions.map((color) => (
                        <option key={color.value} value={color.value}>
                            {color.name}
                        </option>
                    ))}
                </select>
                <button
                    onClick={addNote}
                    className="bg-gray-800 text-white px-4 py-2 rounded"
                >
                    Add
                </button>
            </div>

            {/* Notes List */}
            <ul className="space-y-2">
                {notes.map((note, index) => (
                    <li
                        key={index}
                        className={`flex justify-between items-center px-3 py-2 rounded border ${getColorClass(note.color)}`}
                    >
                        <span>{note.text}</span>
                        <button
                            onClick={() => deleteNote(index)}
                            className="text-sm text-gray-700 hover:underline"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}
