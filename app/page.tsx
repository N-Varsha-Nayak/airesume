'use client';

import Link from 'next/link';
import { Navigation } from '@/app/components/Navigation';

export default function Home() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Build a Resume<br />
            That Gets Read.
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Create a professional resume with live preview. Optimized for ATS and designed for impact.
          </p>

          <Link
            href="/builder"
            className="inline-block px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors text-lg"
          >
            Start Building →
          </Link>
        </div>

        {/* Features Section */}
        <div className="max-w-5xl mx-auto px-6 py-24 border-t border-gray-200">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Live Preview</h3>
              <p className="text-gray-600">
                See your resume update in real-time as you type. Preview exactly how it will look.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Premium Design</h3>
              <p className="text-gray-600">
                Professionally designed template that stands out while remaining ATS-friendly.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">All Sections</h3>
              <p className="text-gray-600">
                Add multiple entries for experience, education, projects, and skills.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
