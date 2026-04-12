import * as React from 'react';
import { X } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '../../atoms/radio-group';
import { Label } from '../../atoms/label';
import { Separator } from '../../atoms/separator';

interface FilterProps {
  onClose?: () => void;
  options: Array<{
    id: string;
    value: string;
    label: string;
  }>;
  selectedValue?: string;
  onFilterChange?: (value: string) => void;
  title?: string;
}

export const Filter = ({
  onClose,
  options,
  selectedValue,
  onFilterChange,
  title = 'Status',
}: FilterProps) => {
  const [selectedStatus, setSelectedStatus] = React.useState(
    selectedValue ?? options[0]?.value ?? ''
  );

  const handleStatusChange = (newValue: string) => {
    setSelectedStatus(newValue);
    onFilterChange?.(newValue);
  };

  return (
    <div className="inline-flex min-w-40 flex-col gap-3 rounded-md border border-neutral-200 bg-popover p-4 text-popover-foreground shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-primary-600">Filters</span>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-neutral-100 hover:text-foreground"
            aria-label="Close filter"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>
      <Separator />
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </span>
      <RadioGroup value={selectedStatus} onValueChange={handleStatusChange}>
        {options.map((option) => (
          <div key={option.id} className="flex items-center gap-2">
            <RadioGroupItem id={option.id} value={option.value} />
            <Label htmlFor={option.id} className="text-sm font-normal">
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Filter;
