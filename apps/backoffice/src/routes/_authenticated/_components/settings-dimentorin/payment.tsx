import { Button, Input, Select, Textarea } from "@imphnen-frontend-service/ui/atoms"
import { cn } from "@imphnen-frontend-service/utils"
import { FC } from "react"

const labelClass = cn('text-neutral-800 text-[10px] font-medium mb-1.5 inline-block md:text-xs md:mb-2 xl:text-p3')

export const PaymentSettings: FC = () => {
  return (
    <div>
      <h1 className="text-p2 font-semibold text-neutral-700 mb-8">Payment</h1>

      <div className="grid grid-cols-2 gap-x-8 gap-y-5 mb-8">
        <div>
          <label className={labelClass}>Integrasi Payment Gateway</label>
          <Textarea className="min-w-full w-full h-20" placeholder="Durasi dalam menit" />
        </div>
        <div>
          <label className={labelClass}>Mata Uang</label>
          <Select defaultValue="idr">
            <option value="idr">Rupiah (IDR)</option>
            <option value="usd">Dollar (USD)</option>
          </Select>
        </div>
        <div>
          <label className={labelClass}>Harga sesi mentoring <span className="text-neutral-600">(default)</span></label>
          <Input type="text" className="min-w-full w-full" placeholder="Masukkan harga sesi mentoring" />
        </div>
        <div>
          <label className={labelClass}>Tarif Komisi untuk Platform</label>
          <Input type="text" className="min-w-full w-full" placeholder="Masukkan persentase komisi" />
        </div>
      </div>

      <h2 className="text-p3 font-semibold text-neutral-700 mb-5">Invoice</h2>
      <div className="mb-32">
        <label className={labelClass}>Masukkan Format Invoice</label>
        <Input type="file" className="min-w-full w-full" placeholder="InvoiceDimentorin.png" />
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
