import React from 'react';
import { HackathonContent } from '@/content/hackathons/types';

interface HackathonRequirementsProps {
  requirements: HackathonContent['metadata']['requirements'];
}

export function HackathonRequirements({ requirements }: HackathonRequirementsProps) {
  if (!requirements || requirements.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg p-6 border">
      <h3 className="text-lg font-semibold mb-4">Requirements</h3>
      <div className="space-y-3">
        {requirements.map((req) => (
          <div key={req.id} className="flex items-start gap-3">
            <div className={`w-2 h-2 rounded-full mt-2 ${
              req.mandatory ? 'bg-red-500' : 'bg-blue-500'
            }`} />
            <div>
              <div className="font-medium text-sm">{req.name}</div>
              <div className="text-xs text-muted-foreground">
                {req.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}