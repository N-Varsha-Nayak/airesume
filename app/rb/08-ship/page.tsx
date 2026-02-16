'use client';

import { PremiumLayout } from '@/app/components/PremiumLayout';
import { StepGate } from '@/app/components/StepGate';

export default function Step08Ship() {
  return (
    <StepGate step={8}>
      <PremiumLayout step={8} title="Step 08 — Ship">
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">Deployment & Launch</h2>
            <p className="text-blue-800">
              Prepare and deploy your AI Resume Builder to production.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900">Workspace Instructions</h3>
            <p className="text-gray-600">
              Deploy your application to a production environment. Set up monitoring, logging, and
              error tracking. Prepare documentation for users and maintenance.
            </p>
            <p className="text-gray-600">
              Ensure the application is scalable, secure, and maintainable in production.
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-gray-900">Expected Deliverable</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Production deployment (live URL)</li>
              <li>GitHub repository with complete code</li>
              <li>Deployment documentation</li>
              <li>User documentation & guides</li>
              <li>Monitoring & logging setup</li>
            </ul>
          </div>
        </div>
      </PremiumLayout>
    </StepGate>
  );
}
