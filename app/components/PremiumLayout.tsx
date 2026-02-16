'use client';

import React, { ReactNode } from 'react';
import { useBuild } from '@/app/contexts/BuildContext';
import { BuildPanel } from '@/app/components/BuildPanel';

interface PremiumLayoutProps {
  children: ReactNode;
  step: number;
  title: string;
  artifactContent?: string;
}

export function PremiumLayout({ children, step, title, artifactContent }: PremiumLayoutProps) {
  const { isStepCompleted, completedSteps } = useBuild();

  const getStepStatus = (stepNum: number) => {
    if (completedSteps.has(stepNum)) return 'completed';
    if (stepNum === step) return 'active';
    if (stepNum < step) return 'completed';
    return 'locked';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-900">AI Resume Builder</div>
        <div className="text-center">
          <span className="text-sm text-gray-600">Project 3 — Step {step} of 8</span>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(getStepStatus(step))}`}>
          {getStepStatus(step) === 'active' && '🟡 In Progress'}
          {getStepStatus(step) === 'completed' && '✓ Complete'}
          {getStepStatus(step) === 'locked' && '🔒 Locked'}
        </div>
      </div>

      {/* Context Header - Step Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {Array.from({ length: 8 }, (_, i) => i + 1).map((stepNum) => (
            <div key={stepNum} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                  completedSteps.has(stepNum)
                    ? 'bg-green-500 text-white'
                    : stepNum === step
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                }`}
              >
                {stepNum}
              </div>
              {stepNum < 8 && <div className="w-2 h-0.5 bg-gray-300"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 gap-4 p-6">
        {/* Main Workspace (70%) */}
        <div className="flex-1 w-7/10 bg-white rounded-lg border border-gray-200 p-6 overflow-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-600">Step {step} of 8</p>
          </div>
          {children}
        </div>

        {/* Secondary Build Panel (30%) */}
        <BuildPanel step={step} title={title} artifactContent={artifactContent} />
      </div>

      {/* Proof Footer */}
      <div className="bg-gray-100 border-t border-gray-200 px-6 py-3 text-center text-xs text-gray-600">
        <span>No skipping steps. Next button enabled only after artifact upload. Visit /rb/proof to submit.</span>
      </div>
    </div>
  );
}
