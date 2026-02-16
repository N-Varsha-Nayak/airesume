'use client';

import { PremiumLayout } from '@/app/components/PremiumLayout';
import { StepGate } from '@/app/components/StepGate';

export default function Step07Test() {
  return (
    <StepGate step={7}>
      <PremiumLayout step={7} title="Step 07 — Test">
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">Testing & QA</h2>
            <p className="text-blue-800">
              Thoroughly test the application and ensure all features work as expected.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900">Workspace Instructions</h3>
            <p className="text-gray-600">
              Conduct comprehensive testing: user flows, edge cases, performance, and security.
              Document test results and fix any bugs found.
            </p>
            <p className="text-gray-600">
              Include unit tests, integration tests, and user acceptance testing documentation.
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-gray-900">Expected Deliverable</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Test plan and test cases</li>
              <li>Unit test coverage report</li>
              <li>Integration test documentation</li>
              <li>Bug report and fixes log</li>
              <li>Performance metrics</li>
            </ul>
          </div>
        </div>
      </PremiumLayout>
    </StepGate>
  );
}
