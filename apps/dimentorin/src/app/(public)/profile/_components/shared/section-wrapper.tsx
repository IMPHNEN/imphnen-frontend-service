import { FC, ReactElement, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  title: string;
  editButton?: ReactElement;
  children: ReactNode;
  delay?: number;
}

export const SectionWrapper: FC<SectionWrapperProps> = ({ title, editButton, children, delay = 0 }): ReactElement => {
  return (
    <motion.div
      className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {editButton}
      </div>
      {children}
    </motion.div>
  );
};
