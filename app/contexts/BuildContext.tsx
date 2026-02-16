'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface StepArtifact {
  stepNumber: number;
  artifactUrl?: string;
  timestamp?: string;
  fileName?: string;
}

interface BuildContextType {
  completedSteps: Set<number>;
  artifacts: Map<number, StepArtifact>;
  currentStep: number;
  uploadArtifact: (step: number, url: string, fileName: string) => void;
  isStepCompleted: (step: number) => boolean;
  canAccessStep: (step: number) => boolean;
  setCurrentStep: (step: number) => void;
  getArtifact: (step: number) => StepArtifact | undefined;
  finalSubmission: {
    lovableLink?: string;
    githubLink?: string;
    deployLink?: string;
  };
  setFinalSubmission: (data: {
    lovableLink?: string;
    githubLink?: string;
    deployLink?: string;
  }) => void;
}

const BuildContext = createContext<BuildContextType | undefined>(undefined);

export function BuildProvider({ children }: { children: ReactNode }) {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [artifacts, setArtifacts] = useState<Map<number, StepArtifact>>(new Map());
  const [currentStep, setCurrentStep] = useState(0);
  const [finalSubmission, setFinalSubmission] = useState({
    lovableLink: '',
    githubLink: '',
    deployLink: '',
  });

  // Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('rb_build_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompletedSteps(new Set(parsed.completedSteps));
        setArtifacts(new Map(parsed.artifacts));
        setCurrentStep(parsed.currentStep);
        setFinalSubmission(parsed.finalSubmission || {});
      } catch (e) {
        console.error('Failed to load build state:', e);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    const stateToSave = {
      completedSteps: Array.from(completedSteps),
      artifacts: Array.from(artifacts.entries()),
      currentStep,
      finalSubmission,
    };
    localStorage.setItem('rb_build_state', JSON.stringify(stateToSave));
  }, [completedSteps, artifacts, currentStep, finalSubmission]);

  const uploadArtifact = (step: number, url: string, fileName: string) => {
    const newArtifacts = new Map(artifacts);
    newArtifacts.set(step, {
      stepNumber: step,
      artifactUrl: url,
      fileName,
      timestamp: new Date().toISOString(),
    });
    setArtifacts(newArtifacts);

    // Mark step as completed
    const newCompleted = new Set(completedSteps);
    newCompleted.add(step);
    setCompletedSteps(newCompleted);
  };

  const isStepCompleted = (step: number): boolean => {
    return completedSteps.has(step);
  };

  const canAccessStep = (step: number): boolean => {
    // Step 1 always accessible
    if (step === 1) return true;
    // Other steps require previous step completion
    return completedSteps.has(step - 1);
  };

  return (
    <BuildContext.Provider
      value={{
        completedSteps,
        artifacts,
        currentStep,
        uploadArtifact,
        isStepCompleted,
        canAccessStep,
        setCurrentStep,
        getArtifact: (step: number) => artifacts.get(step),
        finalSubmission,
        setFinalSubmission,
      }}
    >
      {children}
    </BuildContext.Provider>
  );
}

export function useBuild() {
  const context = useContext(BuildContext);
  if (!context) {
    throw new Error('useBuild must be used within BuildProvider');
  }
  return context;
}
