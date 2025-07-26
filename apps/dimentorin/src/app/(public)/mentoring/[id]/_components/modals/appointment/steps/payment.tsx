import { For, Show } from "@imphnen-frontend-service/utils"
import { FC } from "react"
import { motion } from "framer-motion"
import { TOPICS } from "../../../sections/topics"

type Props = {
  selectedTopics: number[]
}

export const PaymentStep: FC<Props> = ({ selectedTopics }) => {
  return (
    <motion.div
      className="bg-white px-6 py-5 rounded-md grid gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-9"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="space-y-6 xl:col-span-4">
        <div>
          <p className="w-max mx-auto text-[10px] text-neutral-400 font-medium mb-2 md:text-xs md:ms-0">
            Senpai Kamu
          </p>
          <div>
            <div className="aspect-square mb-2 size-10 mx-auto rounded-full overflow-hidden md:size-20 md:ms-0">
              <img src="/image/testimonial.webp" alt="Mentor" className="w-full object-cover" />
            </div>
            <div className="w-44 mx-auto text-center md:ms-0 md:text-left md:mb-2 md:text-[15px] md:w-auto">
              <h3 className="text-xs font-semibold mb-1 xl:text-[15px]">
                Muhammad Firdaus Oi Oi Oi, S.H., M.H.
              </h3>
              <p className="text-[10px] text-neutral-600 md:text-xs">
                UI Designer at Oray orayan Studios
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-[10px] text-neutral-400 font-medium mb-2 md:text-xs">
            Topics :
          </p>
          <div className="flex flex-wrap gap-2">
            <For data={TOPICS}>
              {(topic) => (
                <Show key={topic.id} condition={selectedTopics.includes(topic.id)}>
                  <div
                    className="px-2.5 py-2 text-neutral-800 bg-white border border-primary-100 rounded-md shadow text-[10px] font-medium"
                  >
                    <span>{topic.icon} </span>
                    <span>{topic.name}</span>
                  </div>
                </Show>
              )}
            </For>
          </div>
        </div>
      </div>

      <div className="space-y-6 xl:col-span-5">
        <div>
          <p className="text-[10px] text-neutral-400 font-medium mb-2 md:text-xs">
            Metode Pembayaran
          </p>
          <div className="mb-3">
            <p className="text-[8px] text-neutral-400 mb-2 md:text-[10px]">
              Virtual Account
            </p>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
              <For data={['BCA', 'BRI', 'BNI', 'MANDIRI', 'BCA-Virtual', 'BNI-Virtual', 'MANDIRI-Virtual']}>
                {(bank, index) => (
                  <div
                    key={index}
                    className="p-1 bg-white rounded-xs border border-primary-50 flex items-center gap-x-1"
                  >
                    <input type="radio" name="payment" id={bank} className="size-2" />
                    <label htmlFor={bank} className="block">
                      <img src="/image/payment/bca.webp" alt={bank} className="object-scale-down" />
                    </label>
                  </div>
                )}
              </For>
            </div>
          </div>
          <div>
            <p className="text-[8px] text-neutral-400 mb-2 md:text-[10px]">
              QRIS
            </p>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
              <div
                className="p-1 bg-white rounded-xs border border-primary-50 flex items-center gap-x-1"
              >
                <input type="radio" name="payment" id="QRIS" className="size-2" />
                <label htmlFor="QRIS" className="block">
                  <img src="/image/payment/qris.webp" alt="QRIS" className="object-scale-down" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-[10px] text-neutral-400 font-medium mb-2 md:text-xs">
            Detail Pembayaran
          </p>
          <div className="grid grid-cols-2 space-y-2.5 text-[10px] text-neutral-400 font-medium md:text-xs md:space-y-3">
            <p className="font-normal">Subtotal :</p>
            <p className="text-right">Rp. 50.000</p>
            <p className="font-normal">Service Fee :</p>
            <p className="text-right">Rp. 2.000</p>

            <hr className="border-neutral-200 col-span-full mt-1" />

            <p className="text-neutral-700">Total :</p>
            <p className="text-right text-neutral-700">Rp. 52.000</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
