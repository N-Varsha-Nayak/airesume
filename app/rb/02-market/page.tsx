'use client';

import { PremiumLayout } from '@/app/components/PremiumLayout';
import { StepGate } from '@/app/components/StepGate';

export default function Step02Market() {
  return (
    <StepGate step={2}>
      <PremiumLayout step={2} title="Step 02 — Market">
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">Market Analysis</h2>
            <p className="text-blue-800">
              Research the market landscape, identify competitors, and position your solution.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900">Workspace Instructions</h3>
            <p className="text-gray-600">
              Analyze the resume building market. Identify existing solutions, market gaps, and your
              unique value proposition.
            </p>
            <p className="text-gray-600">
              Upload your market research document to proceed to the next step.
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-gray-900">Expected Deliverable</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Competitor analysis (5+ tools)</li>
              <li>Market size estimation</li>
              <li>Your UVP (Unique Value Proposition)</li>
              <li>ICP (Ideal Customer Profile)</li>
            </ul>
          </div>
        </div>
      </PremiumLayout>
    </StepGate>
  );
}
