import ThirtyDayPlan from "./[components]/ThirtyDayPlan";
import JobPlatformTracker from "./[components]/JobPlatformTracker";
import LeetCodeTracker from "./[components]/LeetCodeTracker";
import NotesSection from "./[components]/NotesSection";
import GoalsSection from "./[components]/GoalsSection";
import ResetButton from "./[components]/ResetButton";

export default function Home() {
  return (
    <main className="h-screen bg-gray-100 p-4 space-y-6 overflow-y-scroll hide-scrollbar">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-2xl font-bold">Job Search Tracker – 30 Day Sprint</h1>
        <p className="text-gray-600">{new Date().toDateString()}</p>
      </header>

      {/* 30-Day Plan */}
      <section>
        <ThirtyDayPlan />
      </section>

      {/* Two-column section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Job Applications */}
        <section className="bg-white p-4 rounded shadow">
          <JobPlatformTracker />
        </section>

        {/* LeetCode Problem Solving */}
        <section className="bg-white p-4 rounded shadow">
          <LeetCodeTracker />
        </section>
      </div>

      {/* Notes and Goals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Notes */}
        <section className="md:col-span-2 bg-white p-4 rounded shadow">
          <NotesSection />
        </section>

        {/* Goals */}
        <section className="bg-white p-4 rounded shadow">
          <GoalsSection />
        </section>
      </div>

      <div className="flex justify-end">
        <ResetButton />
      </div>

    </main>
  );
}
