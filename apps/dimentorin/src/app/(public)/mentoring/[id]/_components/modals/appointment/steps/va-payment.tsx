import { For } from "@imphnen-frontend-service/utils"
import { motion } from "framer-motion"

const PAYMENT_STEP = [
  'Buka aplikasi e-wallet atau m-banking kamu',
  'Pergi ke fitur transfer via Virtual Account',
  'Pilih bank dan kode VA sesuai dengan yang ada pada halaman ini',
  'Konfimasi pembayaran, dan proses selesai.'
]

export const VAPaymentStep = () => {
  return (
    <motion.div
      className="bg-white px-6 py-5 rounded-md md:flex md:items-center md:gap-11"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="mb-6 md:mb-0">
        <h3 className="text-xs font-semibold mb-4 text-neutral-600 text-center md:text-start">
          Silahkan ikuti instruksi pembayaran di bawah ini
        </h3>

        <p className="text-[10px] text-neutral-400 mb-1.5">
          Cara melakukan pembayaran
        </p>
        <ul className="list-decimal pl-2.5">
          <For data={PAYMENT_STEP}>
            {(step, index) => (
              <li key={index} className="text-[10px] text-neutral-400 leading-tight font-medium">
                {step}
              </li>
            )}
          </For>
        </ul>
      </div>

      <div className="text-center md:text-start">
        <div className="w-max mx-auto mb-3 md:ms-0 md:mb-4">
          <img src="/image/payment/bca.webp" alt="VA BCA" className="h-5 w-auto" />
        </div>

        <p className="text-[10px] text-neutral-400 mb-1 font-medium md:text-xs">
          Kode Virtual Account
        </p>
        <p className="text-xs font-semibold text-neutral-700 mb-1.5 md:text-[15px]">
          8091239861969812
        </p>
        <p className="text-[8px] text-neutral-400 md:text-[10px]">
          A/N Unknown
        </p>
      </div>
    </motion.div>
  )
}
