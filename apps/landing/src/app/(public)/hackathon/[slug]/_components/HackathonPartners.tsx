import React from 'react';
import { HackathonContent } from '@/content/hackathons/types';
import { BiBuilding } from 'react-icons/bi';

interface HackathonPartnersProps {
  partners: HackathonContent['metadata']['partners'];
}

export function HackathonPartners({ partners }: HackathonPartnersProps) {
  if (!partners || partners.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <BiBuilding className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Sponsors Yet</h3>
        <p className="text-muted-foreground">
          Sponsor information will appear here once partnerships are announced.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Event Sponsors</h3>
        <span className="text-sm text-muted-foreground">
          {partners.length} sponsor{partners.length !== 1 ? 's' : ''}
        </span>
      </div>
      <p>
        Kami berterima kasih kepada sponsor-sponsor berikut yang telah mendukung hackathon ini, tanpa dukungan mereka, acara ini tidak akan mungkin terlaksana.
        </p>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {partners.map((partner, idx) => (
          <a
            key={idx}
            href={partner.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-card rounded-lg border hover:shadow-md transition-all hover:border-primary/50"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={partner.logo}
              alt={partner.name}
              className="w-12 h-12 object-contain flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="font-medium text-sm block truncate">{partner.name}</span>
              <span className="text-xs text-muted-foreground">Sponsor</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}