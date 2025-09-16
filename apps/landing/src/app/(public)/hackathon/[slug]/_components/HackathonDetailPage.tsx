'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { HackathonContent } from '@/content/hackathons/types';
import { 
  getDaysLeftText, 
  getProgressPercent, 
  formatDateRange
} from '@/content/hackathons/utils';

interface Props {
  hackathon: HackathonContent;
}

export function HackathonDetailPage({ hackathon }: Props) {
  const { metadata, content } = hackathon;
  const progressPercent = getProgressPercent(metadata);
  const daysLeftText = getDaysLeftText(metadata);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${metadata.cover})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {metadata.name}
            </h1>
            {metadata.theme && (
              <p className="text-xl md:text-2xl mb-6 text-gray-200">
                {metadata.theme}
              </p>
            )}
            {metadata.description && (
              <p className="text-lg text-gray-300">
                {metadata.description}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Status Bar */}
      {(progressPercent !== null && daysLeftText && parseInt(daysLeftText) > -5) && (
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
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose  max-w-none"
            >
              <MDXRemote source={content} />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Quick Info */}
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

              {/* Tags */}
              {metadata.tags && metadata.tags.length > 0 && (
                <div className="bg-card rounded-lg p-6 border">
                  <h3 className="text-lg font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {metadata.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Requirements */}
              {metadata.requirements && metadata.requirements.length > 0 && (
                <div className="bg-card rounded-lg p-6 border">
                  <h3 className="text-lg font-semibold mb-4">Requirements</h3>
                  <div className="space-y-3">
                    {metadata.requirements.map((req) => (
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
              )}

              {/* Partners */}
              {metadata.partners && metadata.partners.length > 0 && (
                <div className="bg-card rounded-lg p-6 border">
                  <h3 className="text-lg font-semibold mb-4">Partners</h3>
                  <div className="space-y-3">
                    {metadata.partners.map((partner, idx) => (
                      <a
                        key={idx}
                        href={partner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={partner.logo} 
                          alt={partner.name}
                          className="w-8 h-8 object-contain"
                        />
                        <span className="text-sm font-medium">{partner.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}