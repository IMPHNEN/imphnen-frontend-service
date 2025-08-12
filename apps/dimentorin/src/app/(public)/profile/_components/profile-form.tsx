import { FC, useState } from 'react';
import { EditOutlined, DownloadOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { DescriptionModal, SocialMediaModal, ProfileBasicInfoModal, ExperienceModal, EducationModal, CVModal, NotificationModal } from './modals';

interface SocialLink {
  platform: string;
  placeholder: string;
  value: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  period: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
}

export const ProfileForm: FC = () => {
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [isSocialMediaModalOpen, setIsSocialMediaModalOpen] = useState(false);
  const [isProfileBasicInfoModalOpen, setIsProfileBasicInfoModalOpen] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  // Notification modal state
  const [notification, setNotification] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
    title: string;
    message?: string;
  }>({
    isOpen: false,
    type: 'success',
    title: '',
    message: ''
  });

  const showNotification = (type: 'success' | 'error', title: string, message?: string) => {
    setNotification({
      isOpen: true,
      type,
      title,
      message
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isOpen: false }));
  };
  const [profileData, setProfileData] = useState({
    name: 'Rizal Syaepulloh',
    title: 'Mentor | Roadmap Front-End',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Praesent varius ultrices lorem, ut vulputate felis varius vitae. Ut in dictum ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec sit amet ante in magna cursus iaculis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi. Sed dignissim lorem sit amet eros scelerisque, eu vehicula mauris consectetur.',
  });

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { platform: 'LinkedIn', placeholder: 'https://www.linkedin.com/in/username', value: '' },
    { platform: 'Github', placeholder: 'https://github.com/username', value: '' },
    { platform: 'Stackoverflow', placeholder: 'https://stackoverflow.com/users/userid/username', value: '' },
    { platform: 'Facebook(Opsional)', placeholder: 'https://www.facebook.com/username', value: '' },
  ]);

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      company: 'Sunday.com',
      position: 'Intern Front-End',
      duration: '7 Months',
      period: 'Jan 2024 - Present'
    },
    {
      id: '2',
      company: 'CodeX Digital',
      position: 'Intern Front-End',
      duration: '6 Months',
      period: 'July 2024 - Dec 2024'
    }
  ]);

  const [education, setEducation] = useState<Education[]>([
    {
      id: '1',
      institution: 'Universitas Widjyabakti',
      degree: 'Inform Front-End',
      field: 'S.Teknik',
      period: 'Sep 2022 - Current'
    },
    {
      id: '2',
      institution: 'SMKN 5B Banjaran',
      degree: 'Rekayasa Perangkat Lunak',
      field: 'S.Teknik',
      period: 'May 2020 - Dec 2020'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Profile Basic Info */}
      <motion.div
        className="bg-white rounded-lg p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-2xl font-semibold text-gray-600">RS</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{profileData.name}</h2>
              <p className="text-gray-600">{profileData.title}</p>
            </div>
          </div>
          <Button
            variant="text"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setIsProfileBasicInfoModalOpen(true)}
          >
            <EditOutlined />
            Edit
          </Button>
        </div>
      </motion.div>

      {/* Social Media */}
      <motion.div
        className="bg-white rounded-lg p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Social Media</h3>
          <Button
            variant="text"
            size="sm"
            className="text-blue-500 flex items-center gap-1"
            onClick={() => setIsSocialMediaModalOpen(true)}
          >
            Edit
            <EditOutlined />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {socialLinks.map((link) => (
            <div key={link.platform} className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <div className="text-sm font-medium text-gray-700 mb-2">{link.platform}</div>
              <div className="text-gray-900 text-sm">
                {link.value || <span className="text-gray-400 italic">{link.placeholder}</span>}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Description */}
      <motion.div
        className="bg-white rounded-lg p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Description</h3>
          <Button
            variant="text"
            size="sm"
            className="text-blue-500 flex items-center gap-1"
            onClick={() => setIsDescriptionModalOpen(true)}
          >
            Edit
            <EditOutlined />
          </Button>
        </div>

        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap min-h-[150px] p-4 border border-gray-200 rounded-md bg-gray-50">
          {profileData.description}
        </div>
      </motion.div>

      {/* CV/Resume */}
      <motion.div
        className="bg-white rounded-lg p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">CV/Resume</h3>
          <button
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            onClick={() => setIsCVModalOpen(true)}
          >
            <EditOutlined />
            Edit
          </button>
        </div>

        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-gray-300 rounded flex items-center justify-center">
            <span className="text-gray-600 text-xs font-medium">PDF</span>
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">Resume_RizalSyaepulloh.pdf</p>
          </div>
          <Button variant="primary" size="sm" className="flex items-center gap-2">
            <DownloadOutlined />
            Download
          </Button>
        </div>
      </motion.div>

      {/* Experiences */}
      <motion.div
        className="bg-white rounded-lg p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Experiences</h3>
          <div className="flex gap-2">
            <Button
              variant="text"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setIsExperienceModalOpen(true)}
            >
              <EditOutlined />
              Edit
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{exp.company}</h4>
                <p className="text-gray-700">{exp.position}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>{exp.duration}</span>
                  <span>•</span>
                  <span>{exp.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Education */}
      <motion.div
        className="bg-white rounded-lg p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Education</h3>
          <div className="flex gap-2">
            <Button
              variant="text"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setIsEducationModalOpen(true)}
            >
              <EditOutlined />
              Edit
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{edu.institution}</h4>
                <p className="text-gray-700">{edu.degree}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>{edu.field}</span>
                  <span>•</span>
                  <span>{edu.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Modals */}
      <DescriptionModal
        isOpen={isDescriptionModalOpen}
        onClose={() => setIsDescriptionModalOpen(false)}
        initialValue={profileData.description}
        onSave={(newDescription) => {
          setProfileData({ ...profileData, description: newDescription });
          showNotification('success', 'Description Updated', 'Your description has been successfully updated.');
        }}
      />

      <SocialMediaModal
        isOpen={isSocialMediaModalOpen}
        onClose={() => setIsSocialMediaModalOpen(false)}
        initialValue={socialLinks}
        onSave={(newSocialLinks) => {
          setSocialLinks(newSocialLinks);
          showNotification('success', 'Social Media Updated', 'Your social media links have been successfully updated.');
        }}
      />

      <ProfileBasicInfoModal
        isOpen={isProfileBasicInfoModalOpen}
        onClose={() => setIsProfileBasicInfoModalOpen(false)}
        initialValue={{ name: profileData.name, title: profileData.title }}
        onSave={(newProfileInfo) => {
          setProfileData({
            ...profileData,
            name: newProfileInfo.name,
            title: newProfileInfo.title
          });
          showNotification('success', 'Profile Updated', 'Your profile information has been successfully updated.');
        }}
      />

      <ExperienceModal
        isOpen={isExperienceModalOpen}
        onClose={() => setIsExperienceModalOpen(false)}
        initialValue={experiences}
        onSave={(newExperiences) => {
          setExperiences(newExperiences);
          showNotification('success', 'Experience Updated', 'Your experience information has been successfully updated.');
        }}
      />

      <EducationModal
        isOpen={isEducationModalOpen}
        onClose={() => setIsEducationModalOpen(false)}
        initialValue={education}
        onSave={(newEducation) => {
          setEducation(newEducation);
          showNotification('success', 'Education Updated', 'Your education information has been successfully updated.');
        }}
      />

      <CVModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
        initialValue={{ fileName: 'Resume_RizalSyaepulloh.pdf' }}
        onSave={(cvData) => {
          console.log('CV updated:', cvData);
          showNotification('success', 'CV Updated', 'Your CV/Resume has been successfully updated.');
        }}
      />

      <NotificationModal
        isOpen={notification.isOpen}
        onClose={hideNotification}
        type={notification.type}
        title={notification.title}
        message={notification.message}
      />
    </div>
  );
};
