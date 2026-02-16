'use client';

import { Navigation } from '@/app/components/Navigation';
import { ResumePreview } from '@/app/components/ResumePreview';
import { TemplateSelector } from '@/app/components/TemplateSelector';
import { useResume } from '@/app/contexts/ResumeContext';
import Link from 'next/link';

export default function PreviewPage() {
  const { data } = useResume();

  return (
    <>
      <Navigation />

      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Resume Preview</h1>
            <div className="flex gap-4 items-center">
              <TemplateSelector />
              <Link
                href="/builder"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                ← Edit Resume
              </Link>
            </div>
          </div>

          {/* Full-Page Resume */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-12">
              <ResumePreview data={data} minimal={true} />
            </div>
          </div>

          {/* Print Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => window.print()}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium"
            >
              Print Resume
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
