'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBuild } from '@/app/contexts/BuildContext';

export default function ProofPage() {
  const { state, getStepProgress, submitFinal } = useBuild();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const progress = getStepProgress();
  const allStepsComplete = progress === 8;

  const steps = [
    { id: '01-problem', name: 'Define Problem', label: 'Problem Definition' },
    { id: '02-ideation', name: 'Brainstorm Ideas', label: 'Ideation' },
    { id: '03-architecture', name: 'Design Architecture', label: 'Architecture' },
    { id: '04-validation', name: 'Validate Solution', label: 'Validation' },
    { id: '05-prototype', name: 'Build Prototype', label: 'Prototype' },
    { id: '06-refinement', name: 'Refine & Test', label: 'Refinement' },
    { id: '07-launch', name: 'Go Live', label: 'Launch' },
    { id: '08-ship', name: 'Ship & Review', label: 'Final Submission' },
  ];

  const handleSubmit = () => {
    if (allStepsComplete) {
      setSubmitting(true);
      setTimeout(() => {
        submitFinal(new Date().toISOString());
        setSubmitted(true);
        setSubmitting(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Proof & artifacts</h1>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">{progress}</div>
              <div className="text-xs text-gray-600">of 8 Complete</div>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                allStepsComplete
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {allStepsComplete ? '✓ Ready' : 'Incomplete'}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {submitted && state.finalSubmission.submittedAt ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-12 text-center">
            <div className="text-4xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-green-900 mb-2">Submission Complete!</h2>
            <p className="text-green-800 mb-6">
              Your build track and all artifacts have been submitted successfully.
            </p>
            <p className="text-sm text-green-700 mb-8">
              Submitted at {new Date(state.finalSubmission.submittedAt).toLocaleString()}
            </p>
            <Link
              href="/rb/01-problem"
              className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              Start New Build Track
            </Link>
          </div>
        ) : (
          <>
            {/* Artifacts Summary */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Collected Artifacts</h2>

              <div className="space-y-3">
                {steps.map((step, idx) => {
                  const artifact = state.artifacts.get(step.id);
                  const isCompleted = state.completedSteps.has(step.id);

                  return (
                    <div key={step.id} className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            {isCompleted ? (
                              <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold">
                                ✓
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-bold">
                                {idx + 1}
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{step.label}</h3>
                            {artifact && (
                              <p className="text-sm text-gray-600">
                                📄 {artifact.fileName}
                              </p>
                            )}
                          </div>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            isCompleted
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {isCompleted ? 'Complete' : 'Pending'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submission Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Final Submission</h2>

              {allStepsComplete ? (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-800">
                      ✓ All 8 steps complete. Ready to submit your build track artifacts.
                    </p>
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full px-6 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-bold text-lg disabled:bg-gray-400"
                  >
                    {submitting ? 'Submitting...' : 'Submit Build Track'}
                  </button>
                  <p className="text-xs text-gray-600 text-center">
                    This will lock your artifacts and mark your build track as complete.
                  </p>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    ⚠ Complete all 8 steps before submitting. You have {progress} of 8.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
