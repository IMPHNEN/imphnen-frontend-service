import { cn } from "@imphnen-frontend-service/utils";
import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

export type ToggleInputProps = DetailedHTMLProps<
  HTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string
  labelClassName?: string
}

export const ToggleInput: FC<ToggleInputProps> = ({ label, className, labelClassName, ...rest }) => {
  return (
    <label className={cn("flex items-center gap-5 cursor-pointer mb-8", className)}>
      <span className={cn("text-p3 text-gray-800 font-medium", labelClassName)}>{label}</span>
      <input type="checkbox" className="sr-only peer" {...rest} />
      <div
        className={cn(
          "w-14 h-7 bg-gray-300 rounded-3xl relative transition-colors",
          "peer-checked:bg-blue-600 peer-focus:outline peer-focus:outline-blue-500 peer-checked:[&>div]:translate-x-6.5",
        )}
      >
        <div className="absolute left-0.5 top-0.5 h-6 w-6 bg-white rounded-full shadow transition-transform peer-checked:translate-x-6.5" />
      </div>
    </label>
  );
}
