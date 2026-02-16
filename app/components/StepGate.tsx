'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBuild } from '@/app/contexts/BuildContext';

interface StepGateProps {
  step: number;
  children: React.ReactNode;
}

export function StepGate({ step, children }: StepGateProps) {
  const router = useRouter();
  const { canAccessStep, completedSteps } = useBuild();

  useEffect(() => {
    // Always allow step 1
    if (step === 1) return;

    // Check if user can access this step
    if (!canAccessStep(step)) {
      // Redirect to step 1 if they can't access
      router.push('/rb/01-problem');
    }
  }, [step, canAccessStep, router]);

  // If step > 1 and user can't access, show blocked message
  if (step > 1 && !canAccessStep(step)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">🔒 Step Locked</h1>
          <p className="text-gray-600 mb-6">
            You must complete Step {step - 1} before accessing Step {step}.
          </p>
          <button
            onClick={() => router.push(`/rb/0${step - 1}-${getStepTitle(step - 1)}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-medium"
          >
            Go to Previous Step
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

function getStepTitle(step: number): string {
  const titles: Record<number, string> = {
    1: 'problem',
    2: 'market',
    3: 'architecture',
    4: 'hld',
    5: 'lld',
    6: 'build',
    7: 'test',
    8: 'ship',
  };
  return titles[step] || 'step';
}
