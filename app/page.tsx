'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white rounded-lg shadow-xl p-12 max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          🚀 AI Resume Builder
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Build Track — Premium Project 3
        </p>
        
        <div className="space-y-6 mb-8 text-left bg-gray-50 rounded-lg p-6">
          <p className="text-gray-700">
            Step through a comprehensive 8-step build system to create your AI Resume Builder:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <span className="font-semibold">01.</span> Problem Analysis
            </li>
            <li className="flex items-center gap-2">
              <span className="font-semibold">02.</span> Market Research
            </li>
            <li className="flex items-center gap-2">
              <span className="font-semibold">03.</span> System Architecture
            </li>
            <li className="flex items-center gap-2">
              <span className="font-semibold">04.</span> High-Level Design
            </li>
            <li className="flex items-center gap-2">
              <span className="font-semibold">05.</span> Low-Level Design
            </li>
            <li className="flex items-center gap-2">
              <span className="font-semibold">06.</span> Implementation Build
            </li>
            <li className="flex items-center gap-2">
              <span className="font-semibold">07.</span> Testing & QA
            </li>
            <li className="flex items-center gap-2">
              <span className="font-semibold">08.</span> Deployment & Ship
            </li>
          </ul>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/rb/01-problem"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition"
          >
            ➜ Start Building
          </Link>
          <Link
            href="/rb/proof"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition"
          >
            📋 View Proof
          </Link>
        </div>
      </div>
    </div>
  );
}
