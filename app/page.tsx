import ThirtyDayPlan from "./[components]/ThirtyDayPlan";
import JobPlatformTracker from "./[components]/JobPlatformTracker";
import LeetCodeTracker from "./[components]/LeetCodeTracker";
import NotesSection from "./[components]/NotesSection";
import GoalsSection from "./[components]/GoalsSection";
import ResetButton from "./[components]/ResetButton";
import InterviewTracker from "./[components]/InterviewTracker";
import MotivationBox from "./[components]/MotivationBox";
import JobBoardLinks from "./[components]/JobBoardLinks";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen bg-gray-100 p-4 space-y-6 overflow-y-scroll hide-scrollbar">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-2xl font-bold">Job Search Tracker – 30 Day Sprint</h1>
        <p className="text-gray-600">{new Date().toDateString()}</p>
      </header>

      <div>
        <MotivationBox />
      </div>

      {/* 30-Day Plan */}
      <section>
        <ThirtyDayPlan />
      </section>

      <section>
        <JobBoardLinks />
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

      <div>
        <InterviewTracker />
      </div>

      <div className="flex justify-end">
        <div className="flex gap-5">
          <Link href={'https://tineshwarke-portfolio.vercel.app/'} target="_blank">
          <Image src={'/coder.png'} height={20} width={40} alt="😎" className="hover:scale-130 transition-transform"/>
          </Link>
          <ResetButton />
        </div>
      </div>

    </main>
  );
}
