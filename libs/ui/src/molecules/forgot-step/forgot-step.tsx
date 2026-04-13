import { FC, ReactElement } from "react"

interface TForgotStepProps {
  step: number
}

export const ForgotStep: FC<TForgotStepProps> = ({
    step = 1,
}): ReactElement => {
    return (
        <div className="w-full flex items-start gap-4 mb-8">
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className={`h-[12px] rounded-[8px] w-full transition-colors duration-300 ${step >= 1 ? "bg-[#23a1eb]" : "bg-[#bce1fb]"}`}></div>
            <h4 className={`font-semibold text-[12px] text-center transition-colors duration-300 ${step >= 1 ? "text-[#23a1eb]" : "text-[#454545]"}`}>Masukkan Email</h4>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className={`h-[12px] rounded-[8px] w-full transition-colors duration-300 ${step >= 2 ? "bg-[#23a1eb]" : "bg-[#bce1fb]"}`}></div>
            <h4 className={`font-semibold text-[12px] text-center transition-colors duration-300 ${step >= 2 ? "text-[#23a1eb]" : "text-[#454545]"}`}>Verifikasi OTP</h4>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className={`h-[12px] rounded-[8px] w-full transition-colors duration-300 ${step >= 3 ? "bg-[#23a1eb]" : "bg-[#bce1fb]"}`}></div>
            <h4 className={`font-semibold text-[12px] text-center transition-colors duration-300 ${step >= 3 ? "text-[#23a1eb]" : "text-[#454545]"}`}>Summon Password ^^</h4>
          </div>
        </div>
    )
}
