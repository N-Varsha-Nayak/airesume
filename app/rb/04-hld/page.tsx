'use client';

import { PremiumLayout } from '@/app/components/PremiumLayout';
import { StepGate } from '@/app/components/StepGate';

export default function Step04HLD() {
  return (
    <StepGate step={4}>
      <PremiumLayout step={4} title="Step 04 — HLD (High-Level Design)">
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">High-Level Design</h2>
            <p className="text-blue-800">
              Design the user-facing features and user flows for AI Resume Builder.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900">Workspace Instructions</h3>
            <p className="text-gray-600">
              Create wireframes and user flow diagrams. Design the key screens: resume input,
              AI processing, resume preview, and export options.
            </p>
            <p className="text-gray-600">
              Document user journeys and interaction patterns.
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-gray-900">Expected Deliverable</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>User flow diagrams (Figma/Lovable)</li>
              <li>Wireframes for key screens</li>
              <li>Feature specifications</li>
              <li>UI/UX guidelines</li>
            </ul>
          </div>
        </div>
      </PremiumLayout>
    </StepGate>
  );
}
