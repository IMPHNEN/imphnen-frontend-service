import { FC } from 'react';
import { EditOutlined } from '@ant-design/icons';

interface EditSectionButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const EditSectionButton: FC<EditSectionButtonProps> = ({ onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-1 px-3 py-1 text-sm transition-colors duration-200 rounded-md ${
        disabled
          ? 'text-gray-400 cursor-not-allowed opacity-50'
          : 'text-[#23A1EB] hover:text-[#1e90d6] hover:bg-[#23A1EB]/10'
      }`}
      aria-label="Edit section"
    >
      <span>Edit</span>
      <EditOutlined className="w-3 h-3" />
    </button>
  );
};
