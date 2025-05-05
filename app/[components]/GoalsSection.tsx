'use client';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'job_dashboard_goals';

const colorOptions = [
    { name: 'High Priority', className: 'bg-red-100 border-red-400 text-red-800', value: 'red' },
    { name: 'Medium Priority', className: 'bg-yellow-100 border-yellow-400 text-yellow-800', value: 'yellow' },
    { name: 'Long Term', className: 'bg-blue-100 border-blue-400 text-blue-800', value: 'blue' },
    { name: 'Completed', className: 'bg-green-100 border-green-400 text-green-800', value: 'green' },
    { name: 'Personal', className: 'bg-purple-100 border-purple-400 text-purple-800', value: 'purple' },
];

interface Goal {
    text: string;
    color: string;
    completed: boolean;
}

export default function GoalsSection() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [newGoal, setNewGoal] = useState('');
    const [selectedColor, setSelectedColor] = useState('yellow');

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) setGoals(parsed);
            } catch {
                console.warn('Invalid goal data');
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    }, [goals]);

    const addGoal = () => {
        if (!newGoal.trim()) return;
        const newGoalObj: Goal = { text: newGoal.trim(), color: selectedColor, completed: false };
        setGoals((prev) => [newGoalObj, ...prev]);
        setNewGoal('');
    };

    const deleteGoal = (index: number) => {
        setGoals((prev) => prev.filter((_, i) => i !== index));
    };

    const toggleGoal = (index: number) => {
        setGoals((prev) =>
            prev.map((goal, i) => (i === index ? { ...goal, completed: !goal.completed } : goal))
        );
    };

    const getColorClass = (color: string) =>
        colorOptions.find((c) => c.value === color)?.className || 'bg-gray-100';

    return (
        <section className="p-4 rounded shadow bg-white space-y-4 h-60 overflow-y-scroll hide-scrollbar">
            <h2 className="text-xl font-semibold">🎯 Goals</h2>

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

            {/* Add Goal */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <input
                    type="text"
                    placeholder="Enter your goal..."
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    className="flex-1 border px-3 py-2 rounded"
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
                    onClick={addGoal}
                    className="bg-gray-800 text-white px-4 py-2 rounded"
                >
                    Add
                </button>
            </div>

            {/* Goal List */}
            <ul className="space-y-2">
                {goals.map((goal, index) => (
                    <li
                        key={index}
                        className={`flex items-center justify-between px-3 py-2 rounded border ${getColorClass(goal.color)}`}
                    >
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={goal.completed}
                                onChange={() => toggleGoal(index)}
                                className="w-5 h-5 checkbox"
                            />
                            <span className={`text-sm ${goal.completed ? 'line-through text-green-700 font-medium' : ''}`}>
                                {goal.text}
                            </span>
                        </div>
                        <button
                            onClick={() => deleteGoal(index)}
                            className="text-sm text-gray-600 hover:underline"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}
