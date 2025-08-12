import { FC } from 'react';
import { MailOutlined, PhoneOutlined, LinkedinOutlined, GithubOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { motion } from 'framer-motion';
import { For } from '@imphnen-frontend-service/utils';

const skills = [
  'UI/UX Design',
  'Figma',
  'Adobe XD',
  'Prototyping',
  'User Research',
  'Design Systems'
];

const languages = [
  { name: 'Bahasa Indonesia', level: 'Native' },
  { name: 'English', level: 'Fluent' },
  { name: 'Japanese', level: 'Beginner' }
];

export const ProfileInfo: FC = () => {
  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <motion.div
        className="bg-white rounded-lg p-6 shadow-sm"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-800">Contact Info</h3>
          <Button variant="secondary" size="sm">
            <EditOutlined className="text-sm" />
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <MailOutlined className="text-primary-500 text-sm" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Email</p>
              <p className="text-sm font-medium">firdaus@example.com</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <PhoneOutlined className="text-primary-500 text-sm" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Phone</p>
              <p className="text-sm font-medium">+62 812-3456-7890</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Social Links */}
      <motion.div
        className="bg-white rounded-lg p-6 shadow-sm"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-800">Social Links</h3>
          <Button variant="secondary" size="sm">
            <EditOutlined className="text-sm" />
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <LinkedinOutlined className="text-blue-600 text-sm" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">LinkedIn</p>
              <p className="text-sm font-medium">linkedin.com/in/firdaus</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <GithubOutlined className="text-gray-700 text-sm" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">GitHub</p>
              <p className="text-sm font-medium">github.com/firdaus</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div
        className="bg-white rounded-lg p-6 shadow-sm"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-800">Skills</h3>
          <Button variant="secondary" size="sm">
            <EditOutlined className="text-sm" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <For data={skills}>
            {(skill) => (
              <span
                key={skill}
                className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
              >
                {skill}
              </span>
            )}
          </For>
        </div>
      </motion.div>

      {/* Languages */}
      <motion.div
        className="bg-white rounded-lg p-6 shadow-sm"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-800">Languages</h3>
          <Button variant="secondary" size="sm">
            <EditOutlined className="text-sm" />
          </Button>
        </div>

        <div className="space-y-3">
          <For data={languages}>
            {(language) => (
              <div key={language.name} className="flex justify-between items-center">
                <span className="text-sm font-medium text-neutral-800">{language.name}</span>
                <span className="text-xs text-neutral-600 bg-neutral-100 px-2 py-1 rounded">
                  {language.level}
                </span>
              </div>
            )}
          </For>
        </div>
      </motion.div>
    </div>
  );
};
