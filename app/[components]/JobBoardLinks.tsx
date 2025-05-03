"use client";

import { useRef, useState, useEffect } from "react";
export function getStorage<T>(key: string): T | null {
    if (typeof window === "undefined") return null;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

export function setStorage<T>(key: string, value: T) {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(value));
}

type JobBoard = {
    name: string;
    url: string;
};

const defaultJobBoards: JobBoard[] = [
    { name: "LinkedIn", url: "https://www.linkedin.com/jobs/" },
    { name: "Naukri", url: "https://www.naukri.com/" },
    { name: "Indeed", url: "https://www.indeed.com/" },
    { name: "Unstop", url: "https://unstop.com/" },
    { name: "Internshala", url: "https://internshala.com/" },
    { name: "Beep", url: "https://www.eventbeep.com/" },
    { name: "Instahyre", url: "https://www.instahyre.com/" },
    { name: "Wellfound", url: "https://wellfound.com/jobs" },
    { name: "HackerRank", url: "https://www.hackerrank.com/jobs" },
    { name: "Hirist", url: "https://www.hirist.com/" },
    { name: "AngelList", url: "https://angel.co/" },
];

export default function JobBoardLinks() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [jobBoards, setJobBoards] = useState<JobBoard[]>(defaultJobBoards);
    const [showForm, setShowForm] = useState(false);
    const [newName, setNewName] = useState("");
    const [newUrl, setNewUrl] = useState("");

    useEffect(() => {
        const saved: JobBoard[] | null = getStorage("jobBoards");
        if (saved) {
            setJobBoards(saved);
        }
    }, []);

    useEffect(() => {
        setStorage("jobBoards", jobBoards);
    }, [jobBoards]);

    const scroll = (dir: "left" | "right") => {
        scrollRef.current?.scrollBy({
            left: dir === "left" ? -300 : 300,
            behavior: "smooth",
        });
    };

    const handleAdd = () => {
        if (!newName.trim() || !newUrl.trim()) return;
        const newBoard = { name: newName.trim(), url: newUrl.trim() };
        setJobBoards((prev) => [...prev, newBoard]);
        setNewName("");
        setNewUrl("");
        setShowForm(false);
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-md w-full">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-gray-800">🌐 Job Boards</h2>
                <div className="space-x-2 hidden sm:flex">
                    <button
                        onClick={() => scroll("left")}
                        className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
                    >
                        ◀
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
                    >
                        ▶
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex overflow-x-auto space-x-3 scroll-smooth mb-4  overflow-y-scroll hide-scrollbar"
            >
                {jobBoards.map((board, idx) => (
                    <a
                        key={idx}
                        href={board.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 whitespace-nowrap"
                    >
                        {board.name}
                    </a>
                ))}
            </div>

            {showForm ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <input
                        type="text"
                        placeholder="Platform Name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full sm:w-auto"
                    />
                    <input
                        type="url"
                        placeholder="Platform URL"
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full sm:w-auto"
                    />
                    <button
                        onClick={handleAdd}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-md"
                    >
                        Add
                    </button>
                    <button
                        onClick={() => setShowForm(false)}
                        className="text-gray-500 hover:text-gray-700 text-sm ml-2"
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setShowForm(true)}
                    className="text-sm mt-1 text-blue-600 hover:underline"
                >
                    ➕ Add New Platform
                </button>
            )}
        </div>
    );
}
