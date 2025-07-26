import { CheckOutlined } from "@ant-design/icons"
import { cn } from "@imphnen-frontend-service/utils"
import { motion } from "framer-motion"

export const SuccessStep = () => {
  return (
    <motion.div
      className="pb-6 rounded-md md:pb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <h2 className="text-[15px] font-semibold mb-3 text-primary-500 text-center md:text-[19px] md:mb-7 xl:text-[23px] xl:mb-8">
        Booking Senpai Berhasil
      </h2>

      <div
        className={cn(
          "mb-3 flex justify-center items-center mx-auto size-[60px] bg-green-200 rounded-full",
          "md:size-[100px] md:mb-7 xl:size-[120px] xl:mb-8"
        )}
      >
        <div className="bg-green-500 rounded-full size-10 flex justify-center items-center text-white md:size-16 xl:size-20">
          <CheckOutlined className="text-xl md:text-3xl xl:text-5xl" />
        </div>
      </div>
      
      <p className="text-[10px] text-neutral-400 text-center md:text-xs md:max-w-[220px] md:mx-auto xl:text-[15px]">
        Untuk detail dan instruksi berikutnya dapat dilihat di dashboard pada halaman booking
      </p>
    </motion.div>
  )
}
