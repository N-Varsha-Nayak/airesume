'use client';

import { PremiumLayout } from '@/app/components/PremiumLayout';
import { StepGate } from '@/app/components/StepGate';

export default function Step05LLD() {
  return (
    <StepGate step={5}>
      <PremiumLayout step={5} title="Step 05 — LLD (Low-Level Design)">
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">Low-Level Design</h2>
            <p className="text-blue-800">
              Design the detailed implementation specifications and API contracts.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900">Workspace Instructions</h3>
            <p className="text-gray-600">
              Document API endpoints, database schema, frontend component hierarchy, and state
              management architecture.
            </p>
            <p className="text-gray-600">
              Include detailed specifications for each module and integration points.
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-gray-900">Expected Deliverable</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>API specifications (endpoints, request/response schemas)</li>
              <li>Database schema and relationships</li>
              <li>Component architecture diagram</li>
              <li>State management design</li>
            </ul>
          </div>
        </div>
      </PremiumLayout>
    </StepGate>
  );
}
