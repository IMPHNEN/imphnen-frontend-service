import { Button, Textarea, ToggleInput } from "@imphnen-frontend-service/ui/atoms"
import { FC } from "react"

export const NotificationSettings: FC = () => {
  return (
    <div>
      <h1 className="text-p2 font-semibold text-neutral-700 mb-8">Notification Settings</h1>

      <div>
        <div className="flex items-center gap-8 flex-wrap">
          <ToggleInput label="Nyalakan Notifikasi Email" />
          <ToggleInput label="Beritahu mentor ketika ada request" />
          <ToggleInput label="Beritahu mentee untuk update sesi " />
        </div>

        <div className="mb-20">
          <label className="text-neutral-800 font-medium inline-block mb-2 text-p3">
            API Integrasi Notifikasi (URL)
          </label>
          <Textarea placeholder="Masukkan url API notifikasi yang akan digunakan" className="w-full h-40" />
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
