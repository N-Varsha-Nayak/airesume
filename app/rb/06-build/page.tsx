'use client';

import { PremiumLayout } from '@/app/components/PremiumLayout';
import { StepGate } from '@/app/components/StepGate';

export default function Step06Build() {
  return (
    <StepGate step={6}>
      <PremiumLayout step={6} title="Step 06 — Build">
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">Implementation Build</h2>
            <p className="text-blue-800">
              Build the AI Resume Builder application with all core features implemented.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900">Workspace Instructions</h3>
            <p className="text-gray-600">
              Build the full application using Lovable or your preferred tech stack. Include:
              frontend UI, backend APIs, AI integration, and database connectivity.
            </p>
            <p className="text-gray-600">
              Upload your built application code to Lovable and deploy it.
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-gray-900">Expected Deliverable</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Complete working application</li>
              <li>All core features implemented</li>
              <li>Backend APIs functional</li>
              <li>AI/ML integration working</li>
              <li>Live deployment link</li>
            </ul>
          </div>
        </div>
      </PremiumLayout>
    </StepGate>
  );
}
