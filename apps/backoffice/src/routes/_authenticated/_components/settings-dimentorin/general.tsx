import { Button, Input, NativeSelect as Select, ToggleInput } from "@imphnen-frontend-service/ui/atoms"
import { cn } from "@imphnen-frontend-service/utils"
import { FC } from "react"

const labelClass = cn('text-neutral-800 text-[10px] font-medium mb-1.5 inline-block md:text-xs md:mb-2 xl:text-p3')

export const GeneralSettings: FC = () => {
  return (
    <div>
      <h1 className="text-p2 font-semibold text-neutral-700 mb-8">General Settings</h1>

      <div>
        <ToggleInput label="Mode Maintenance" />

        <h2 className="text-p3 font-semibold text-neutral-700 mb-5">Platform Settings</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-5 mb-8">
          <div>
            <label className={labelClass}>Nama Platform</label>
            <Input type="text" className="min-w-full w-full" />
          </div>
          <div>
            <label className={labelClass}>Bahasa</label>
            <Select defaultValue="id" className="w-full">
              <option value="id">Indonesia</option>
              <option value="en">English</option>
            </Select>
          </div>
          <div>
            <label className={labelClass}>Logo Platform</label>
            <Input type="file" className="min-w-full w-full" />
          </div>
          <div>
            <label className={labelClass}>Favicon</label>
            <Input type="file" className="min-w-full w-full" />
          </div>
        </div>

        <h2 className="text-p3 font-semibold text-neutral-700 mb-5">Legal Settings</h2>
        <div className="grid gap-x-8 gap-y-5 mb-20">
          <div>
            <label className={labelClass}>URL Syarat & Ketentuan</label>
            <Input type="text" className="min-w-full w-full" />
          </div>
          <div>
            <label className={labelClass}>URL Kebijakan Privasi</label>
            <Input type="text" className="min-w-full w-full" />
          </div>
        </div>

        <div className="flex justify-end gap-5">
          <Button type="button" variant="bordered">
            Batal
          </Button>
          <Button type="button">
            Simpan
          </Button>
        </div>
      </div>
    </div>
  )
}
