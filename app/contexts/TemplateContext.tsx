'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type TemplateType = 'classic' | 'modern' | 'minimal';

interface TemplateContextType {
  template: TemplateType;
  setTemplate: (template: TemplateType) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export function TemplateProvider({ children }: { children: ReactNode }) {
  const [template, setTemplateState] = useState<TemplateType>('classic');
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('resumeTemplate');
      if (saved && ['classic', 'modern', 'minimal'].includes(saved)) {
        setTemplateState(saved as TemplateType);
      }
    } catch (e) {
      console.error('Failed to load template:', e);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage when template changes
  const setTemplate = (newTemplate: TemplateType) => {
    setTemplateState(newTemplate);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('resumeTemplate', newTemplate);
      } catch (e) {
        console.error('Failed to save template:', e);
      }
    }
  };

  return (
    <TemplateContext.Provider value={{ template, setTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within TemplateProvider');
  }
  return context;
}
