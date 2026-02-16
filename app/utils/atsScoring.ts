import { ResumeData } from '@/app/contexts/ResumeContext';

export interface ATSScore {
  score: number;
  suggestions: string[];
  details: {
    summaryScore: number;
    projectsScore: number;
    experienceScore: number;
    skillsScore: number;
    linksScore: number;
    metricsScore: number;
    educationScore: number;
  };
}

export function calculateATSScore(data: ResumeData): ATSScore {
  let score = 0;
  const suggestions: string[] = [];
  const details = {
    summaryScore: 0,
    projectsScore: 0,
    experienceScore: 0,
    skillsScore: 0,
    linksScore: 0,
    metricsScore: 0,
    educationScore: 0,
  };

  // 1. Summary length check (40-120 words) - +15 points
  if (data.summary) {
    const wordCount = data.summary.trim().split(/\s+/).length;
    if (wordCount >= 40 && wordCount <= 120) {
      score += 15;
      details.summaryScore = 15;
    } else {
      suggestions.push('Write a stronger summary (40–120 words).');
    }
  } else {
    suggestions.push('Write a stronger summary (40–120 words).');
  }

  // 2. At least 2 projects - +10 points
  if (data.projects.length >= 2) {
    score += 10;
    details.projectsScore = 10;
  } else {
    suggestions.push('Add at least 2 projects.');
  }

  // 3. At least 1 experience entry - +10 points
  if (data.experience.length >= 1) {
    score += 10;
    details.experienceScore = 10;
  } else {
    suggestions.push('Add at least 1 work experience entry.');
  }

  // 4. Skills list with ≥ 8 items - +10 points
  if (data.skills) {
    const totalSkills = 
      (data.skills.technical?.length || 0) + 
      (data.skills.soft?.length || 0) + 
      (data.skills.tools?.length || 0);
    if (totalSkills >= 8) {
      score += 10;
      details.skillsScore = 10;
    } else {
      suggestions.push(`Add more skills (target 8+, currently ${totalSkills}).`);
    }
  } else {
    suggestions.push('Add more skills (target 8+).');
  }

  // 5. GitHub or LinkedIn link - +10 points
  if (data.links.github || data.links.linkedin) {
    score += 10;
    details.linksScore = 10;
  } else {
    suggestions.push('Add GitHub or LinkedIn profile link.');
  }

  // 6. Metrics in experience/projects (numbers like %, X, k) - +15 points
  let hasMetrics = false;
  const metricsRegex = /(\d+%)|(\d+[kK])|(\d+\+)|(\d+→\d+)/;

  // Check experience descriptions
  if (data.experience.some((exp) => metricsRegex.test(exp.description))) {
    hasMetrics = true;
  }

  // Check project descriptions
  if (data.projects.some((proj) => metricsRegex.test(proj.description))) {
    hasMetrics = true;
  }

  if (hasMetrics) {
    score += 15;
    details.metricsScore = 15;
  } else {
    suggestions.push('Add measurable impact (numbers, percentages) in bullets.');
  }

  // 7. Education section with complete fields - +10 points
  if (data.education.length > 0) {
    const isComplete = data.education.some(
      (edu) => edu.school && edu.degree && edu.field && edu.graduationDate
    );
    if (isComplete) {
      score += 10;
      details.educationScore = 10;
    }
  }

  // Cap at 100
  score = Math.min(score, 100);

  // Keep only top 3 suggestions
  const finalSuggestions = suggestions.slice(0, 3);

  return {
    score,
    suggestions: finalSuggestions,
    details,
  };
}
