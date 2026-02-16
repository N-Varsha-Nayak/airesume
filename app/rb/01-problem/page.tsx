'use client';

import { PremiumLayout } from '@/app/components/PremiumLayout';
import { StepGate } from '@/app/components/StepGate';

export default function Step01Problem() {
  return (
    <StepGate step={1}>
      <PremiumLayout step={1} title="Step 01 — Problem">
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">Define the Problem</h2>
            <p className="text-blue-800">
              Analyze and document the core problem that AI Resume Builder solves for job seekers.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900">Workspace Instructions</h3>
            <p className="text-gray-600">
              Use the build panel on the right to draft your problem statement. Copy content into
              Lovable, build components, and upload your artifact when ready.
            </p>
            <p className="text-gray-600">
              No Next button will appear until you upload your step artifact.
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-gray-900">Expected Deliverable</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Problem statement (200-300 words)</li>
              <li>Key pain points identified</li>
              <li>Target user segment</li>
            </ul>
          </div>
        </div>
      </PremiumLayout>
    </StepGate>
  );
}
