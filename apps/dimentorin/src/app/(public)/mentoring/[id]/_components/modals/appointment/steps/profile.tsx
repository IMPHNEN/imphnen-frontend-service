import { Input } from "@imphnen-frontend-service/ui/atoms"
import { cn } from "@imphnen-frontend-service/utils"
import { motion } from "framer-motion"

const labelClass = cn('text-neutral-800 text-[10px] font-semibold mb-1.5 inline-block md:text-xs md:mb-2 xl:text-[15px]')

export const ProfileStep = () => {
  return (
    <motion.div
      className="bg-white px-6 py-5 rounded-md md:px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <h3 className="text-xs font-semibold mb-1.5 md:text-[15px] md:mb-2 xl:text-[19px]">
        Langkah 3 dari 3
      </h3>
      <p className="text-[10px] text-neutral-600 mb-5 md:text-xs xl:text-[15px]">
        Lengkapi profil kamu agar senpai dapat mengenal kamu lebih baik.
      </p>

      <div className="space-y-2.5 md:space-y-5">
        <div>
          <label className={labelClass}>Nomor WhatsApp</label>
          <Input className="min-w-full w-full" placeholder="080000000" />
        </div>
        <div>
          <label className={labelClass}>CV (Opsional)</label>
          <Input type="file" className="min-w-full w-full" />
        </div>
        <div>
          <label className={labelClass}>Portoflio (Opsional)</label>
          <Input className="min-w-full w-full" placeholder="Link Url" />
        </div>
      </div>
    </motion.div>
  )
}
