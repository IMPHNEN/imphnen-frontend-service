import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface ServerHackathonContentProps {
  content: string;
}

export async function ServerHackathonContent({ content }: ServerHackathonContentProps) {
  return (
    <div className="prose w-full max-w-none">
      <MDXRemote source={content} />
    </div>
  );
}