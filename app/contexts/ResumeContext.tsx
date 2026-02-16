'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    field: string;
    graduationDate: string;
  }>;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string;
    link: string;
  }>;
  skills: string;
  links: {
    github: string;
    linkedin: string;
  };
}

interface ResumeContextType {
  data: ResumeData;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  updateSummary: (summary: string) => void;
  addEducation: (entry: ResumeData['education'][0]) => void;
  updateEducation: (id: string, entry: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (id: string) => void;
  addExperience: (entry: ResumeData['experience'][0]) => void;
  updateExperience: (id: string, entry: Partial<ResumeData['experience'][0]>) => void;
  removeExperience: (id: string) => void;
  addProject: (entry: ResumeData['projects'][0]) => void;
  updateProject: (id: string, entry: Partial<ResumeData['projects'][0]>) => void;
  removeProject: (id: string) => void;
  updateSkills: (skills: string) => void;
  updateLinks: (links: Partial<ResumeData['links']>) => void;
  loadSampleData: () => void;
  reset: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const defaultData: ResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
  },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: '',
  links: {
    github: '',
    linkedin: '',
  },
};

const sampleData: ResumeData = {
  personalInfo: {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
  },
  summary: 'Full-stack developer with 5+ years of experience building scalable web applications. Passionate about React, Node.js, and creating excellent user experiences.',
  education: [
    {
      id: '1',
      school: 'Stanford University',
      degree: 'B.S.',
      field: 'Computer Science',
      graduationDate: 'May 2019',
    },
  ],
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Senior Frontend Engineer',
      startDate: 'Jan 2022',
      endDate: 'Present',
      description: 'Led frontend architecture for 10+ products. Improved performance by 40% through optimization.',
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      startDate: 'Jun 2019',
      endDate: 'Dec 2021',
      description: 'Built MVP for SaaS platform. Managed database design and API development.',
    },
  ],
  projects: [
    {
      id: '1',
      name: 'AI Resume Builder',
      description: 'Web app for building AI-powered resumes with ATS scoring',
      technologies: 'React, Next.js, TypeScript, Tailwind CSS',
      link: 'https://github.com/example/resume-builder',
    },
    {
      id: '2',
      name: 'Task Management Dashboard',
      description: 'Collaborative task management tool with real-time updates',
      technologies: 'Node.js, MongoDB, Socket.io, Vue.js',
      link: 'https://github.com/example/task-dashboard',
    },
  ],
  skills: 'React, Next.js, TypeScript, Node.js, MongoDB, PostgreSQL, Tailwind CSS, GraphQL, REST APIs, Git',
  links: {
    github: 'https://github.com/example',
    linkedin: 'https://linkedin.com/in/example',
  },
};

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ResumeData>(defaultData);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('resumeBuilderData');
      if (saved) {
        setData(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to restore resume data:', e);
    }
    setIsHydrated(true);
  }, []);

  // Auto-save to localStorage whenever data changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('resumeBuilderData', JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save resume data:', e);
    }
  }, [data, isHydrated]);

  const updatePersonalInfo = (info: Partial<ResumeData['personalInfo']>) => {
    setData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const updateSummary = (summary: string) => {
    setData((prev) => ({ ...prev, summary }));
  };

  const addEducation = (entry: ResumeData['education'][0]) => {
    setData((prev) => ({
      ...prev,
      education: [...prev.education, entry],
    }));
  };

  const updateEducation = (id: string, entry: Partial<ResumeData['education'][0]>) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, ...entry } : e)),
    }));
  };

  const removeEducation = (id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  const addExperience = (entry: ResumeData['experience'][0]) => {
    setData((prev) => ({
      ...prev,
      experience: [...prev.experience, entry],
    }));
  };

  const updateExperience = (id: string, entry: Partial<ResumeData['experience'][0]>) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, ...entry } : e)),
    }));
  };

  const removeExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  };

  const addProject = (entry: ResumeData['projects'][0]) => {
    setData((prev) => ({
      ...prev,
      projects: [...prev.projects, entry],
    }));
  };

  const updateProject = (id: string, entry: Partial<ResumeData['projects'][0]>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...entry } : p)),
    }));
  };

  const removeProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const updateSkills = (skills: string) => {
    setData((prev) => ({ ...prev, skills }));
  };

  const updateLinks = (links: Partial<ResumeData['links']>) => {
    setData((prev) => ({
      ...prev,
      links: { ...prev.links, ...links },
    }));
  };

  const loadSampleData = () => {
    setData(sampleData);
  };

  const reset = () => {
    setData(defaultData);
  };

  return (
    <ResumeContext.Provider
      value={{
        data,
        updatePersonalInfo,
        updateSummary,
        addEducation,
        updateEducation,
        removeEducation,
        addExperience,
        updateExperience,
        removeExperience,
        addProject,
        updateProject,
        removeProject,
        updateSkills,
        updateLinks,
        loadSampleData,
        reset,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within ResumeProvider');
  }
  return context;
}
