import { Button, Input } from "@imphnen-frontend-service/ui/atoms";
import { cn } from "@imphnen-frontend-service/utils";
import { FC } from "react";

const labelClass = cn('text-neutral-800 text-[10px] font-medium mb-1.5 inline-block md:text-xs md:mb-2 xl:text-p3')

export const SecuritySettings: FC = () => {
  return (
    <div>
      <h1 className="text-p2 font-semibold text-neutral-700 mb-8">Security Settings</h1>

      <div className="grid grid-cols-2 gap-8 mb-20">
        <div>
          <label className={labelClass}>Durasi Session Timeout</label>
          <Input type="text" className="min-w-full w-full" placeholder="Durasi dalam menit" />
          <p className="text-[10px] text-neutral-800">Auto logout setelah X menit tidak aktif</p>
        </div>
        <div>
          <label className={labelClass}>Blokir Setelah Upaya Gagal</label>
          <Input type="text" className="min-w-full w-full" placeholder="x kali perobaan login" />
          <p className="text-[10px] text-neutral-800">Misal: 5 kali salah login = lock akun</p>
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
  )
}
