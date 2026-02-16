'use client';

import { ResumeData } from '@/app/contexts/ResumeContext';
import { useTemplate } from '@/app/contexts/TemplateContext';

interface ResumePreviewProps {
  data: ResumeData;
  minimal?: boolean;
}

export function ResumePreview({ data, minimal = false }: ResumePreviewProps) {
  const { template } = useTemplate();

  const hasAnyData =
    data.personalInfo.name ||
    data.summary ||
    data.education.length > 0 ||
    data.experience.length > 0 ||
    data.projects.length > 0 ||
    data.skills;

  if (!hasAnyData && !minimal) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-center">
          <div className="text-gray-400 mb-2">📄</div>
          <p className="text-sm text-gray-600">Your resume will appear here</p>
        </div>
      </div>
    );
  }

  // Template styles
  const getStyles = () => {
    switch (template) {
      case 'modern':
        return {
          container: 'border-l-4 border-gray-900',
          header: 'border-b-2 border-gray-300 pb-4 mb-4',
          sectionTitle: 'text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-2 mb-2',
          nameSize: 'text-4xl',
          nameWeight: 'font-bold',
          spacing: 'mb-5',
        };
      case 'minimal':
        return {
          container: '',
          header: 'mb-3',
          sectionTitle: 'text-xs font-semibold uppercase tracking-wide text-gray-900 mb-2',
          nameSize: 'text-2xl',
          nameWeight: 'font-semibold',
          spacing: 'mb-3',
        };
      case 'classic':
      default:
        return {
          container: '',
          header: 'mb-6',
          sectionTitle: 'text-sm font-semibold tracking-wide uppercase mb-3 text-gray-900',
          nameSize: 'text-3xl',
          nameWeight: 'font-bold',
          spacing: 'mb-6',
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className={`${minimal ? '' : 'bg-white rounded-lg border border-gray-200 p-12'} text-gray-900 ${styles.container}`}
    >
      {/* Header */}
      <div className={styles.header}>
        {data.personalInfo.name && (
          <h1 className={`${styles.nameSize} ${styles.nameWeight} tracking-tight mb-2`}>
            {data.personalInfo.name}
          </h1>
        )}
        <div className="flex flex-wrap gap-3 text-xs text-gray-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.links.github && (
            <a
              href={data.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 hover:underline"
            >
              GitHub
            </a>
          )}
          {data.links.linkedin && (
            <a
              href={data.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 hover:underline"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className={styles.spacing}>
          <p className="text-xs leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className={styles.spacing}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className="space-y-3">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900 text-xs">{exp.position}</h3>
                  <span className="text-xs text-gray-600">
                    {exp.startDate}
                    {exp.endDate && ` – ${exp.endDate}`}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-1">{exp.company}</p>
                {exp.description && <p className="text-xs text-gray-700">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className={styles.spacing}>
          <h2 className={styles.sectionTitle}>Education</h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900 text-xs">
                    {edu.degree} in {edu.field}
                  </h3>
                  <span className="text-xs text-gray-600">{edu.graduationDate}</span>
                </div>
                <p className="text-xs text-gray-600">{edu.school}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className={styles.spacing}>
          <h2 className={styles.sectionTitle}>Projects</h2>
          <div className="space-y-2">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-semibold text-gray-900 text-xs">
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {project.name}
                    </a>
                  ) : (
                    project.name
                  )}
                </h3>
                {project.description && <p className="text-xs text-gray-700 mt-1">{project.description}</p>}
                {project.technologies && <p className="text-xs text-gray-600 mt-1">{project.technologies}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && (
        <div>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <p className="text-xs text-gray-700">{data.skills}</p>
        </div>
      )}
    </div>
  );
}
