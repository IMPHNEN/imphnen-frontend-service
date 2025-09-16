import React from 'react';
import { HackathonContent } from '@/content/hackathons/types';

interface HackathonQuickInfoProps {
  metadata: HackathonContent['metadata'];
}

export function HackathonQuickInfo({ metadata }: HackathonQuickInfoProps) {
  return (
    <div className="bg-card rounded-lg p-6 border">
      <h3 className="text-lg font-semibold mb-4">Quick Info</h3>
      <div className="space-y-3 text-sm">
        {metadata.prize && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Prize Pool:</span>
            <span className="font-medium">{metadata.prize}</span>
          </div>
        )}
        {metadata.minTeamSize && metadata.maxTeamSize && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Team Size:</span>
            <span className="font-medium">
              {metadata.minTeamSize === metadata.maxTeamSize
                ? `${metadata.minTeamSize} person${metadata.minTeamSize > 1 ? 's' : ''}`
                : `${metadata.minTeamSize}-${metadata.maxTeamSize} people`
              }
            </span>
          </div>
        )}
        {metadata.submissionsCount && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Submissions:</span>
            <span className="font-medium">{metadata.submissionsCount}</span>
          </div>
        )}
        {metadata.partnersCount && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Partners:</span>
            <span className="font-medium">{metadata.partnersCount}</span>
          </div>
        )}
      </div>
    </div>
  );
}