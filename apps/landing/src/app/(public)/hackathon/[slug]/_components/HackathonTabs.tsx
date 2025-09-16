'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HackathonContent } from '@/content/hackathons/types';
import { HackathonPartners } from './HackathonPartners';
import { HackathonSubmissions } from './HackathonSubmissions';
import { BiGroup, BiFile, BiInfoCircle } from 'react-icons/bi';

interface Submission {
  team_name: string;
  project_title: string;
  description: string;
  repo_link: string;
  screenshot?: string;
  file_name?: string;
}

interface HackathonTabsProps {
  metadata: HackathonContent['metadata'];
  submissions?: Submission[];
  contentElement: React.ReactNode;
}

export function HackathonTabs({ metadata, submissions, contentElement }: HackathonTabsProps) {
  const [activeTab, setActiveTab] = useState('content');

  const tabs = [
    {
      id: 'content',
      label: 'Details',
      icon: BiInfoCircle,
      count: 0 // No count for content tab
    },
    {
      id: 'sponsors',
      label: 'Sponsors',
      icon: BiGroup,
      count: metadata.partners?.length || 0
    },
    {
      id: 'submissions',
      label: 'Submissions',
      icon: BiFile,
      count: submissions?.length || metadata.submissionsCount || 0
    }
  ];

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-4 px-1 cursor-pointer font-medium text-sm flex items-center gap-2 transition-colors`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className="ml-2 bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    layoutId="activeTab"
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'content' && contentElement}
          {activeTab === 'sponsors' && (
            <HackathonPartners partners={metadata.partners} />
          )}
          {activeTab === 'submissions' && (
            <HackathonSubmissions 
              submissions={submissions} 
              submissionsCount={metadata.submissionsCount}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}