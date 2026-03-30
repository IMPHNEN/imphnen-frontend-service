import { FC, ReactElement } from "react";

type TRegisterMentorStep = {
  step: number;
};

const steps = [
  "Informasi Personal",
  "Detail Mentor",
  "Sesi Mentoring & Dokumen Pendukung",
  "Informasi Akun Pribadi",
];

export const RegisterMentorStep: FC<TRegisterMentorStep> = ({ step }): ReactElement => {
  const progressPercent = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <div className="relative w-full px-8">
      <div className="absolute top-5 left-8 right-8 h-0.5 bg-blue-100 z-0" />

      <div
        className="absolute top-5 left-8 h-0.5 bg-blue-500 z-0 transition-all duration-300"
        style={{ width: `calc(${progressPercent}% - 0.5rem)` }}
      />

      <div className="flex justify-between relative z-10">
        {steps.map((label, index) => {
          const currentStep = index + 1;
          const isActive = currentStep === step;

          return (
            <div key={index} className="flex flex-col items-center flex-1 text-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  isActive
                    ? "bg-gradient-to-b from-purple-600 to-blue-500 text-white border-transparent"
                    : "bg-white text-gray-700 border-blue-400"
                }`}
              >
                <span className="font-bold">{currentStep}</span>
              </div>
              <span className="text-xs text-blue-600 mt-2 leading-tight">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
