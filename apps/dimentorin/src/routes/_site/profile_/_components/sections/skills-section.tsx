import { FC, useState, useEffect } from 'react';
import { SkillsModal } from '../modals';
import { SectionWrapper } from '../shared/section-wrapper';
import { NotificationType } from '../modals/notification-modal';
import { EditSectionButton } from '../buttons/edit-section-button';

interface Skill {
  id: string;
  name: string;
}

interface SkillsSectionProps {
  initialSkills: string[];
  onSave: (newSkills: string[]) => Promise<void>;
  showNotification: (type: NotificationType['type'], title: string, message?: string) => void;
  isLoading?: boolean;
  isViewOnly?: boolean;
}

export const SkillsSection: FC<SkillsSectionProps> = ({
  initialSkills,
  onSave,
  showNotification,
  isLoading = false,
  isViewOnly = false,
}) => {
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [skills, setSkills] = useState<string[]>(initialSkills);

  useEffect(() => {
    setSkills(initialSkills);
  }, [initialSkills]);

  const handleSave = async (newSkills: Skill[]) => {
    if (isViewOnly) return;
    const stringSkills = newSkills.map(skill => skill.name);

    await onSave(stringSkills);
  };

  return (
    <SectionWrapper
      title="Skills"
      editButton={
        !isViewOnly ? (
          <EditSectionButton
            onClick={() => setIsSkillsModalOpen(true)}
            disabled={isLoading}
          />
        ) : null
      }
      delay={0.3}
    >
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-block px-3 py-1 bg-[#23A1EB]/10 text-[#23A1EB] text-sm rounded-md border border-[#23A1EB]/20"
          >
            {skill}
          </span>
        ))}
      </div>

      <SkillsModal
        isOpen={isSkillsModalOpen && !isViewOnly}
        onClose={() => setIsSkillsModalOpen(false)}
        initialValue={skills.map(skill => ({ id: skill, name: skill }))}
        onSave={handleSave}
        isLoading={isLoading}
      />
    </SectionWrapper>
  );
};
