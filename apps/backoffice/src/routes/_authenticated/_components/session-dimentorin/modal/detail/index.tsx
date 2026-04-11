import { Icon } from "@iconify/react";
import { Input, Select, Textarea } from "@imphnen-frontend-service/ui/atoms";
import { Modal } from "@imphnen-frontend-service/ui/molecules";
import { cn, For } from "@imphnen-frontend-service/utils";
import { FC } from "react";

const TOPICS = [
  { id: 2, icon: '🏢', name: 'Industry Insight' },
  { id: 4, icon: '🖥️', name: 'Basic IT' },
]

const placeholder = `Hi [Nama Mentor], Saya [Nama Kamu] & saya berharap dapat memiliki sesi mentoring dengan Anda.
  
Saat ini, saya tertarik untuk mengejar __. Tujuan saya untuk sesi ini adalah __.

Saya ingin tahu secara khusus tentang ___.
1.Pertanyaan Anda
2. ...
3. ...`

const labelClass = cn('text-neutral-800 text-[10px] font-semibold mb-1.5 inline-block md:text-xs md:mb-2 xl:text-[15px]')

type ModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

export const ModalDetailSession: FC<ModalProps> = ({ open, setOpen }) => {
  return (
    <Modal
      isOpen={open}
      onClose={() => setOpen(false)}
      className="xl:max-w-[64rem] bg-white px-10 py-9"
      closeButtonClassName="hidden"
    >
      <div>
        <h1 className="bg-primary-50 px-6 py-3 text-neutral-800 text-p2 font-semibold mb-8">
          Detail Sesi
        </h1>

        <div className="grid grid-cols-9 px-9 py-7 border rounded-md gap-12 mb-10">
          <div className="col-span-4 flex items-center gap-x-12">
            <div>
              <h2 className="text-p2 font-semibold text-primary-500 mb-4">Mentor</h2>
              <div>
                <p className="text-p3 font-semibold mb-2.5">Muhammad Firdaus Oi Oi Oi, S.H., M.H.</p>
                <p className="text-neutral-600">UI Designer at Oray orayan Studios</p>
              </div>
            </div>
            <Icon icon="ph:arrow-right" className="text-9xl text-primary-500" />
          </div>

          <div className="col-span-5 flex items-center gap-12">
            <div>
              <h2 className="text-p2 font-semibold text-primary-500 mb-4">Mentee</h2>
              <div>
                <p className="text-p3 font-semibold mb-2.5">Muhammad Firdaus Oi Oi Oi, S.H., M.H.</p>
                <p className="text-neutral-600">UI Designer at Oray orayan Studios</p>
              </div>
            </div>
            <div>
              <h2 className="text-p2 font-semibold text-neutral-700 mb-4">Status</h2>
              <div className="py-2 px-6 rounded-md text-center bg-success-200 text-success-500 font-semibold">
                Finished
              </div>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-p3 font-medium mb-2.5">Topics</h1>
          <div className="p-5 bg-primary-50 border border-primary-100 rounded-md flex flex-wrap gap-2.5 mb-8">
            <For data={TOPICS}>
              {(item, index) => (
                <div
                  key={index}
                  className="px-2.5 py-2 text-neutral-800 bg-white border border-primary-100 rounded-md shadow font-medium"
                >
                  <span>{item.icon} </span>
                  <span>{item.name}</span>
                </div>
              )}
            </For>
          </div>

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
                placeholder={placeholder}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
