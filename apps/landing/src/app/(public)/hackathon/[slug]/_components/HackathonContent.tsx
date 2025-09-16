import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface HackathonContentProps {
  content: string;
}

export function HackathonContent({ content }: HackathonContentProps) {
  return (
    <div className="prose w-full max-w-none">
      <MDXRemote source={content} />
    </div>
  );
}