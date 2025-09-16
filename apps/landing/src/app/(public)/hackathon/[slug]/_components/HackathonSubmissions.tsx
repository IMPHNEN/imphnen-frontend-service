'use client';

import React from 'react';
import { BiLinkExternal, BiLogoGithub, BiImage, BiGroup } from 'react-icons/bi';

interface Submission {
  team_name: string;
  project_title: string;
  description: string;
  repo_link: string;
  screenshot?: string;
  file_name?: string;
}

interface HackathonSubmissionsProps {
  submissions?: Submission[];
  submissionsCount?: number;
}

export function HackathonSubmissions({ submissions, submissionsCount }: HackathonSubmissionsProps) {
  if (!submissions || submissions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <BiGroup className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Submissions Yet</h3>
        <p className="text-muted-foreground">
          Submissions will appear here once participants start submitting their projects.
        </p>
        {submissionsCount && (
          <p className="text-sm text-muted-foreground mt-2">
            Expected submissions: {submissionsCount}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Project Submissions</h3>
        <span className="text-sm text-muted-foreground">
          {submissions.length} project{submissions.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {submissions.map((submission, index) => (
          <div key={index} className="bg-card rounded-lg border hover:shadow-md transition-shadow">
            <div className="space-y-4">
              {/* Header */}
              <div className="w-full h-40 bg-muted rounded-lg rounded-b-none overflow-hidden flex items-center justify-center">
                {submission.screenshot ? (
                  // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={submission.screenshot}
                        alt={submission.project_title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Screenshot Available
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col h-full">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-base">{submission.project_title}</h4>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BiGroup className="w-4 h-4" />
                  <span>{submission.team_name}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed grow line-clamp-6">
                {submission.description}
              </p>

              {/* Links */}
              <div className="flex flex-wrap gap-2 pt-2">
                {submission.repo_link && (
                  <a
                    href={submission.repo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs hover:bg-primary/20 transition-colors"
                  >
                    <BiLogoGithub className="w-3 h-3" />
                    Repository
                    <BiLinkExternal className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}