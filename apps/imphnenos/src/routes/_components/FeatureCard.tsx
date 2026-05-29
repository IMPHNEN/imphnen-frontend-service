import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  tag?: string;
  className?: string;
}

export default function FeatureCard({ icon, title, description, tag, className = '' }: FeatureCardProps) {
  return (
    <div className={`relative group bg-white border border-gray-100 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(35,161,235,0.12)] hover:border-primary-200 hover:-translate-y-1 overflow-hidden ${className}`}>
      {/* Background glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Optional Tag */}
      {tag && (
        <div className="absolute top-6 right-6">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-600">
            {tag}
          </span>
        </div>
      )}

      <div className="relative z-10">
        <div className="w-12 h-12 inline-flex items-center justify-center rounded-xl bg-primary-50 text-primary-500 mb-5 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 shadow-sm">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
