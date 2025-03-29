import { DetailedHTMLProps, FC, InputHTMLAttributes, ReactElement } from "react"

type TForgotStepProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size' | 'type'
> & {
  step: number
};

export const ForgotStep: FC<TForgotStepProps> = ({
    step = 1,
    ...rest
}): ReactElement => {
    return (
        <div className="w-full grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className={`${step === 1 ? "bg-primary-500" : "bg-primary-200"} px-5 py-2 rounded-md w-full`}></div>
            <h4 className={`${step === 1 ? "text-primary-500" : "text-gray-500"} text-xs`}>Masukkan Email</h4>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className={`${step === 2 ? "bg-primary-500" : "bg-primary-200"} px-5 py-2 rounded-md w-full`}></div>
            <h4 className={`${step === 2 ? "text-primary-500" : "text-gray-500"} text-xs`}>Verifikasi OTP</h4>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className={`${step === 3 ? "bg-primary-500" : "bg-primary-200"} px-5 py-2 rounded-md w-full`}></div>
            <h4 className={`${step === 3 ? "text-primary-500" : "text-gray-500"} text-xs`}>Summon Password ^^</h4>
          </div>
        </div>
    )
}
