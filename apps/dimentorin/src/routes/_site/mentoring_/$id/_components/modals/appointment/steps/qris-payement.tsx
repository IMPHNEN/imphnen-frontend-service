import { For } from "@imphnen-frontend-service/utils"
import { motion } from "framer-motion"

const PAYMENT_STEP = [
  'Buka aplikasi e-wallet atau m-banking kamu',
  'Cari fitur bayar menggunakan QRIS',
  'Scan kode QR di samping',
  'Konfimasi pembayaran, dan proses selesai.'
]

export const QrisPaymentStep = () => {
  return (
    <motion.div
      className="bg-white px-6 py-5 rounded-md md:flex md:justify-between md:gap-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="mb-7 md:mb-0">
        <h3 className="text-xs font-semibold mb-4 text-neutral-600 text-center md:text-start">
          Silahkan ikuti instruksi pembayaran di bawah ini
        </h3>

        <p className="text-[10px] text-neutral-400 mb-1.5">
          Cara melakukan pembayaran
        </p>
        <ul className="list-decimal pl-2.5 mb-4 md:mb-7">
          <For data={PAYMENT_STEP}>
            {(step, index) => (
              <li key={index} className="text-[10px] text-neutral-400 leading-tight font-medium">
                {step}
              </li>
            )}
          </For>
        </ul>

        <div className="text-center md:text-start">
          <p className="text-[10px] text-neutral-400 mb-1.5 font-medium md:text-xs">
            Biaya yang harus dibayarkan
          </p>
          <p className="text-xs font-semibold text-neutral-700 md:text-[15px]">Rp. 52.000</p>
        </div>
      </div>

      <div>
        <p className="text-[10px] text-neutral-400 mb-2 font-medium text-center md:text-xs">
          QR Code Pembayaran
        </p>
        <div className="bg-primary-50 p-2.5 rounded-lg size-[120px] mx-auto md:size-[142px] md:me-0">
          <img src="/image/sample-qrcode.webp" alt="QR Code" className="w-full" />
        </div>
      </div>
    </motion.div>
  )
}
