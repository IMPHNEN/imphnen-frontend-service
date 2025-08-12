import { FC, useState } from 'react';
import { EditOutlined, PlusOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Button, Select } from '@imphnen-frontend-service/ui/atoms';
import { PersonalInfoModal, SkillsModal } from './modals';

interface Skill {
  id: string;
  name: string;
  category: string;
}

export const ProfileSidebar: FC = () => {
  const [careerStatus, setCareerStatus] = useState('Career Status');
  const [isPersonalInfoModalOpen, setIsPersonalInfoModalOpen] = useState(false);
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    email: 'rizalwis26@gmail.com',
    phone: '+62 (88) 8888 8888',
    location: 'Jl. Margaasih, Kec. Suryaleksana, Bojongasih'
  });

  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: 'HTML', category: 'frontend' },
    { id: '2', name: 'CSS', category: 'frontend' },
    { id: '3', name: 'Javascript', category: 'frontend' },
    { id: '4', name: 'Next.Js', category: 'frontend' },
    { id: '5', name: 'React', category: 'frontend' },
    { id: '6', name: 'TypeScript', category: 'frontend' },
  ]);

  return (
    <div className="space-y-6">
      {/* Career Status */}
      <motion.div
        className="bg-white rounded-lg p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Career Status</h3>
        </div>
        <Select
          value={careerStatus}
          onChange={(e) => setCareerStatus(e.target.value)}
          className="w-full"
        >
          <option value="Career Status">Career Status</option>
          <option value="Student">Student</option>
          <option value="Fresh Graduate">Fresh Graduate</option>
          <option value="Junior Developer">Junior Developer</option>
          <option value="Senior Developer">Senior Developer</option>
          <option value="Team Lead">Team Lead</option>
          <option value="Freelancer">Freelancer</option>
        </Select>
      </motion.div>

      {/* Personal Information */}
      <motion.div
        className="bg-white rounded-lg p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Personal Informations</h3>
          <Button
            variant="text"
            size="sm"
            className="text-blue-500 flex items-center gap-1"
            onClick={() => setIsPersonalInfoModalOpen(true)}
          >
            Edit
            <EditOutlined />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MailOutlined className="text-blue-500 mt-1" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="text-gray-900 font-medium break-all">{personalInfo.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <PhoneOutlined className="text-blue-500 mt-1" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="text-gray-900 font-medium">{personalInfo.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <EnvironmentOutlined className="text-blue-500 mt-1" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Location</p>
              <p className="text-gray-900 font-medium">{personalInfo.location}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div
        className="bg-white rounded-lg p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
          <div className="flex gap-2">
            <Button
              variant="text"
              size="sm"
              className="text-blue-500 flex items-center gap-1"
              onClick={() => setIsSkillsModalOpen(true)}
            >
              Edit
              <EditOutlined />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="px-4 py-2 border border-blue-500 rounded-md text-sm text-gray-900 bg-white"
            >
              {skill.name}
            </div>
          ))}
        </div>

        {skills.length === 0 && (
          <p className="text-gray-500 text-sm">No skills added yet. Click + to add skills.</p>
        )}
      </motion.div>

      {/* Modals */}
      <PersonalInfoModal
        isOpen={isPersonalInfoModalOpen}
        onClose={() => setIsPersonalInfoModalOpen(false)}
        initialValue={personalInfo}
        onSave={(newPersonalInfo) => setPersonalInfo(newPersonalInfo)}
      />

      <SkillsModal
        isOpen={isSkillsModalOpen}
        onClose={() => setIsSkillsModalOpen(false)}
        initialValue={skills}
        onSave={(newSkills) => setSkills(newSkills)}
      />
    </div>
  );
};
