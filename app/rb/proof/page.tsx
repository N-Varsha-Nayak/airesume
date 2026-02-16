'use client';

import { useState } from 'react';
import { useBuild } from '@/app/contexts/BuildContext';

const STEPS = [
  { id: 1, name: 'Problem', slug: '01-problem' },
  { id: 2, name: 'Market', slug: '02-market' },
  { id: 3, name: 'Architecture', slug: '03-architecture' },
  { id: 4, name: 'HLD', slug: '04-hld' },
  { id: 5, name: 'LLD', slug: '05-lld' },
  { id: 6, name: 'Build', slug: '06-build' },
  { id: 7, name: 'Test', slug: '07-test' },
  { id: 8, name: 'Ship', slug: '08-ship' },
];

export default function ProofPage() {
  const { completedSteps, finalSubmission, setFinalSubmission } = useBuild();
  const [copied, setCopied] = useState(false);

  const handleInputChange = (key: 'lovableLink' | 'githubLink' | 'deployLink', value: string) => {
    setFinalSubmission({
      ...finalSubmission,
      [key]: value,
    });
  };

  const handleCopySubmission = async () => {
    const submissionText = `
AI Resume Builder — Build Track - Final Submission
====================================================

Project 3 Completion Status:
- Problem: ${completedSteps.has(1) ? '✓ Complete' : '⏳ Incomplete'}
- Market: ${completedSteps.has(2) ? '✓ Complete' : '⏳ Incomplete'}
- Architecture: ${completedSteps.has(3) ? '✓ Complete' : '⏳ Incomplete'}
- HLD: ${completedSteps.has(4) ? '✓ Complete' : '⏳ Incomplete'}
- LLD: ${completedSteps.has(5) ? '✓ Complete' : '⏳ Incomplete'}
- Build: ${completedSteps.has(6) ? '✓ Complete' : '⏳ Incomplete'}
- Test: ${completedSteps.has(7) ? '✓ Complete' : '⏳ Incomplete'}
- Ship: ${completedSteps.has(8) ? '✓ Complete' : '⏳ Incomplete'}

Final Links:
- Lovable: ${finalSubmission.lovableLink || '[Not provided]'}
- GitHub: ${finalSubmission.githubLink || '[Not provided]'}
- Deployment: ${finalSubmission.deployLink || '[Not provided]'}

Submission Date: ${new Date().toISOString()}
    `.trim();

    await navigator.clipboard.writeText(submissionText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const completionPercentage = Math.round((completedSteps.size / 8) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-900">AI Resume Builder</div>
        <div className="text-center">
          <span className="text-sm text-gray-600">Project 3 — Step Proof</span>
        </div>
        <div className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          🏁 Final Submission
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-4xl mx-auto w-full">
        <div className="space-y-8">
          {/* Completion Status */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Project 3 Proof of Completion</h1>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                <span className="text-sm font-semibold text-gray-900">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            {/* Step Grid */}
            <div className="grid grid-cols-2 gap-3">
              {STEPS.map((step) => (
                <div
                  key={step.id}
                  className={`p-3 rounded-lg border-2 flex items-center gap-3 ${
                    completedSteps.has(step.id)
                      ? 'bg-green-50 border-green-300'
                      : 'bg-gray-50 border-gray-300'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      completedSteps.has(step.id)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-400 text-white'
                    }`}
                  >
                    {completedSteps.has(step.id) ? '✓' : step.id}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{step.name}</div>
                    <div className="text-xs text-gray-600">
                      {completedSteps.has(step.id) ? 'Complete' : 'Not Started'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final Submission Links */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Final Submission Links</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lovable Project Link
                </label>
                <input
                  type="url"
                  placeholder="https://lovable.dev/..."
                  value={finalSubmission.lovableLink || ''}
                  onChange={(e) => handleInputChange('lovableLink', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Repository Link
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={finalSubmission.githubLink || ''}
                  onChange={(e) => handleInputChange('githubLink', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deployment Link (Live URL)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={finalSubmission.deployLink || ''}
                  onChange={(e) => handleInputChange('deployLink', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Copy Final Submission */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Ready to Submit?</h3>
                <p className="text-sm text-gray-600">
                  Copy your final submission details to share with instructors
                </p>
              </div>
              <button
                onClick={handleCopySubmission}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {copied ? '✓ Copied!' : '📋 Copy Submission'}
              </button>
            </div>
          </div>

          {/* Completion Summary */}
          <div className={`rounded-lg border-2 p-6 ${
            completionPercentage === 100
              ? 'bg-green-50 border-green-300'
              : 'bg-yellow-50 border-yellow-300'
          }`}>
            <div className="flex gap-4">
              <div className="text-3xl">
                {completionPercentage === 100 ? '🎉' : '🔄'}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {completionPercentage === 100
                    ? 'Project Complete!'
                    : 'Project In Progress'}
                </h3>
                <p className="text-sm text-gray-700">
                  {completionPercentage === 100
                    ? 'All 8 steps completed. Ready to submit your final links!'
                    : `${8 - completedSteps.size} step${8 - completedSteps.size === 1 ? '' : 's'} remaining. Complete all steps to unlock submission.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 border-t border-gray-200 px-6 py-3 text-center text-xs text-gray-600">
        <span>AI Resume Builder — Build Track | Project 3 Proof of Completion</span>
      </div>
    </div>
  );
}
