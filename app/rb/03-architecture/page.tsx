'use client';

import { PremiumLayout } from '@/app/components/PremiumLayout';
import { StepGate } from '@/app/components/StepGate';

export default function Step03Architecture() {
  return (
    <StepGate step={3}>
      <PremiumLayout step={3} title="Step 03 — Architecture">
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">System Architecture</h2>
            <p className="text-blue-800">
              Design the overall system architecture and technical approach for AI Resume Builder.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900">Workspace Instructions</h3>
            <p className="text-gray-600">
              Create a high-level system architecture diagram. Include frontend, backend, database,
              and AI/ML components.
            </p>
            <p className="text-gray-600">
              Design diagrams using Lovable components and upload your architecture documentation.
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-gray-900">Expected Deliverable</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>System architecture diagram</li>
              <li>Technology stack selection</li>
              <li>Data flow diagrams</li>
              <li>Component breakdown</li>
            </ul>
          </div>
        </div>
      </PremiumLayout>
    </StepGate>
  );
}
