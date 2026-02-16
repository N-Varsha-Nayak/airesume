'use client';

import { ResumeData } from '@/app/contexts/ResumeContext';

interface ResumePreviewProps {
  data: ResumeData;
  minimal?: boolean;
}

export function ResumePreview({ data, minimal = false }: ResumePreviewProps) {
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

  return (
    <div className={`${minimal ? '' : 'bg-white rounded-lg border border-gray-200 p-12'} text-gray-900`}>
      {/* Header */}
      <div className="mb-6">
        {data.personalInfo.name && (
          <h1 className="text-3xl font-bold tracking-tight mb-2">{data.personalInfo.name}</h1>
        )}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.links.github && (
            <a href={data.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
              GitHub
            </a>
          )}
          {data.links.linkedin && (
            <a href={data.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
              LinkedIn
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold tracking-wide uppercase mb-3 text-gray-900">Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <span className="text-xs text-gray-600">
                    {exp.startDate}
                    {exp.endDate && ` – ${exp.endDate}`}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{exp.company}</p>
                {exp.description && <p className="text-sm text-gray-700">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold tracking-wide uppercase mb-3 text-gray-900">Education</h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <span className="text-xs text-gray-600">{edu.graduationDate}</span>
                </div>
                <p className="text-sm text-gray-600">{edu.school}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold tracking-wide uppercase mb-3 text-gray-900">Projects</h2>
          <div className="space-y-3">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-semibold text-gray-900">
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {project.name}
                    </a>
                  ) : (
                    project.name
                  )}
                </h3>
                {project.description && <p className="text-sm text-gray-700 mt-1">{project.description}</p>}
                {project.technologies && (
                  <p className="text-xs text-gray-600 mt-1">{project.technologies}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && (
        <div>
          <h2 className="text-sm font-semibold tracking-wide uppercase mb-2 text-gray-900">Skills</h2>
          <p className="text-sm text-gray-700">{data.skills}</p>
        </div>
      )}
    </div>
  );
}
