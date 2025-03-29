// eslint-disable-next-line @nx/enforce-module-boundaries
import { Input } from "@imphnen-frontend-service/ui/atoms";
import { ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes, ReactElement, useRef, useState } from "react"

type TForgotStepProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size' | 'type'
> & {
  
};

export const OtpForm: FC<TForgotStepProps> = ({
    step = 1,
    ...rest
}): ReactElement => {
    const [cell, setCell] = useState(new Array(6).fill(""))
    const inputRef = useRef([])

    const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      if (!(/^[0-9]?$/.test(value))) return;

      const newCell = [...cell]
      newCell[index] = value
      setCell(newCell)

      if(value && index < 6 - 1){
        (inputRef.current[index + 1] as HTMLInputElement).focus()
      }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if(e.key === "Backspace" && !cell[index] && index > 0){
        const newCell = [...cell]
        newCell[index] = ""
        setCell(newCell)
        
        const ref = (inputRef.current[index - 1] as HTMLInputElement)
        ref.focus()
      }
    }

    return (
        <div className="w-full grid grid-cols-6 gap-3 my-10">
          {cell.map((v, i) => (
            <Input 
              placeholder="" 
              ref={(el) => {
                inputRef.current.push(el as never)
                return inputRef.current[i]
              }}
              onChange={(e) => handleChange(i, e)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              size="lg"
              value={cell[i]}
              className="sm:min-w-[10px]"
            />
          ))}
        </div>
    )
}
