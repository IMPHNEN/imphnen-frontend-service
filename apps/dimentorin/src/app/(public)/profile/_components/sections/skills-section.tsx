import { FC, useState, useEffect } from 'react';
import { SkillsModal } from '../modals';
import { SectionWrapper } from '../shared/section-wrapper';
import { NotificationType } from '../modals/notification-modal';
import { EditSectionButton } from '../buttons/edit-section-button';

interface Skill {
  id: string;
  name: string;
  category: string;
}

interface SkillsSectionProps {
  initialSkills: string[];
  onSave: (newSkills: string[]) => void;
  showNotification: (type: NotificationType['type'], title: string, message?: string) => void;
}

export const SkillsSection: FC<SkillsSectionProps> = ({
  initialSkills,
  onSave,
  showNotification,
}) => {
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [skills, setSkills] = useState<string[]>(initialSkills);

  // Sync local state with props when initialSkills changes
  useEffect(() => {
    setSkills(initialSkills);
  }, [initialSkills]);

  const handleSave = (newSkills: Skill[]) => {
    const stringSkills = newSkills.map(skill => skill.name);
    // Only call backend update, don't update local state
    // Local state will be updated through useEffect when backend responds
    // Don't show notification here - ProfileForm will handle it after backend success
    onSave(stringSkills);
  };

  return (
    <SectionWrapper
      title="Skills"
      editButton={
        <EditSectionButton onClick={() => setIsSkillsModalOpen(true)} />
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
        isOpen={isSkillsModalOpen}
        onClose={() => setIsSkillsModalOpen(false)}
        initialValue={skills.map(skill => ({ id: skill, name: skill, category: 'unknown' }))}
        onSave={handleSave}
      />
    </SectionWrapper>
  );
};


