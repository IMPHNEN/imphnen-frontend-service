import React from 'react';
import { HackathonContent } from '@/content/hackathons/types';
import { formatDateRange } from '@/content/hackathons/utils';

interface HackathonStatusBarProps {
  metadata: HackathonContent['metadata'];
  progressPercent: number | null;
  daysLeftText: string | null;
}

export function HackathonStatusBar({ metadata, progressPercent, daysLeftText }: HackathonStatusBarProps) {
  // Only show if we have progress and days left, and it's not too far in the past
  if (!(progressPercent !== null && daysLeftText && parseInt(daysLeftText) > -5)) {
    return null;
  }

  return (
    <section className="bg-muted/50 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              metadata.status === 'active' ? 'bg-green-100 text-green-800' :
              metadata.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
              metadata.status === 'ended' ? 'bg-gray-100 text-gray-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {metadata.status?.charAt(0).toUpperCase() + metadata.status?.slice(1)}
            </span>
            {metadata.submissionWindow && (
              <span className="text-sm text-muted-foreground">
                {formatDateRange(metadata.submissionWindow)}
              </span>
            )}
          </div>
          {daysLeftText && (
            <span className="text-sm font-medium">
              {daysLeftText}
            </span>
          )}
        </div>
        {progressPercent !== null && (
          <div className="mt-3">
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}