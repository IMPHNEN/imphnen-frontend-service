import { CloseOutlined } from '@ant-design/icons';
import { useState } from 'react';

interface RadioProps {
  checked?: boolean;
  disabled?: boolean;
  id: string;
  label?: string;
  name: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio = ({
  checked,
  disabled,
  id,
  label,
  name,
  value,
  onChange,
}: RadioProps) => (
  <div className="flex gap-2 items-center">
    <div className="relative grid place-items-center mt-1">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="peer col-start-1 row-start-1 appearance-none shrink-0 size-[10px] bg-primary-100 rounded-full disabled:border-gray-400"
      />
      <div className="pointer-events-none col-start-1 row-start-1 size-[6px] rounded-full peer-checked:bg-primary-500 peer-checked:peer-disabled:bg-gray-400" />
    </div>
    <label htmlFor={id} className="text-start text-neutral-400 text-label2">
      {label || 'This is the radio label'}
    </label>
  </div>
);

interface FilterProps {
  onClose?: () => void;
}

export const Filter = ({ onClose }: FilterProps) => {
  const [selectedStatus, setSelectedStatus] = useState('delivered');

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStatus(e.target.value);
  };

  return (
    <div className="inline-flex flex-col p-[20px] bg-white rounded-lg gap-4 w-[122px] shadow">
      <div className="flex justify-between items-baseline">
        <span className="font-semibold text-p3 text-primary-500">Filters</span>
        <button
          onClick={onClose}
          className="cursor-pointer text-neutral-400 hover:text-neutral-600"
        >
          <CloseOutlined className="text-[12px]" />
        </button>
      </div>
      <hr className="border-primary-200" />
      <span className="font-semibold text-primary-500">Status</span>
      <div className="flex flex-col gap-[10px]">
        <Radio
          id="option1"
          name="status"
          value="undelivered"
          label="Undelivered"
          checked={selectedStatus === 'undelivered'}
          onChange={handleStatusChange}
        />
        <Radio
          id="option2"
          name="status"
          value="delivered"
          label="Delivered"
          checked={selectedStatus === 'delivered'}
          onChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default Filter;
