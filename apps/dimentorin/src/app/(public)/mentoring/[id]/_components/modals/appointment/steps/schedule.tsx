import { Input, Select, Textarea } from "@imphnen-frontend-service/ui/atoms"
import { cn } from "@imphnen-frontend-service/utils"
import { motion } from "framer-motion"

const placeholder = `Hi [Nama Mentor], Saya [Nama Kamu] & saya berharap dapat memiliki sesi mentoring dengan Anda.
  
Saat ini, saya tertarik untuk mengejar __. Tujuan saya untuk sesi ini adalah __.

Saya ingin tahu secara khusus tentang ___.
1.Pertanyaan Anda
2. ...
3. ...`

const labelClass = cn('text-neutral-800 text-[10px] font-semibold mb-1.5 inline-block md:text-xs md:mb-2 xl:text-[15px]')

export const ScheduleStep = () => {
  return (
    <motion.div
      className="bg-white px-6 py-5 rounded-md md:px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <h3 className="text-xs font-semibold mb-1.5 md:text-[15px] md:mb-2 xl:text-[19px]">
        Langkah 2 dari 3
      </h3>
      <p className="text-[10px] text-neutral-600 mb-5 md:text-xs xl:text-[15px]">
        Pilih jadwal sesuai preferensi kamu & siapkan pertanyaanmu
      </p>

      <div className="grid gap-2.5 md:grid-cols-2 md:gap-5">
        <div>
          <label className={labelClass}>Tanggal</label>
          <Input type="date" className="min-w-full w-full" />
        </div>
        <div>
          <label className={labelClass}>Waktu</label>
          <Input type="time" className="min-w-full w-full" />
        </div>
        <div className="relative md:col-span-full">
          <label className={labelClass}>Lokasi</label>
          <Select className="min-w-full w-full">
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </Select>
        </div>
        <div className="md:col-span-full">
          <label className={labelClass}>Pertanyaan Untuk Senpai</label>
          <Textarea
            className="min-w-full w-full h-40"
            placeholder={placeholder} />
        </div>
      </div>
    </motion.div>
  )
}
