import { FC } from 'react';
import { EditOutlined } from '@ant-design/icons';

interface EditSectionButtonProps {
  onClick: () => void;
}

export const EditSectionButton: FC<EditSectionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 px-3 py-1 text-sm text-[#23A1EB] hover:text-[#1e90d6] hover:bg-[#23A1EB]/10 rounded-md transition-colors duration-200"
      aria-label="Edit section"
    >
      <span>Edit</span>
      <EditOutlined className="w-3 h-3" />
    </button>
  );
};
