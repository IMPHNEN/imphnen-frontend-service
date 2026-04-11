import { FC } from "react";
import { ModalProps } from "../type";
import { Modal } from "@imphnen-frontend-service/ui/molecules";
import { cn } from "@imphnen-frontend-service/utils";
import { Button, Select, Textarea } from "@imphnen-frontend-service/ui/atoms";

const labelClass = cn('text-neutral-800 text-[10px] font-semibold mb-1.5 inline-block md:text-xs md:mb-2 xl:text-[15px]')

export const ModalSuspendOrBan: FC<ModalProps> = ({ open, setOpen }) => {
  return (
    <Modal
      isOpen={open}
      onClose={() => setOpen(false)}
      className="bg-white px-10 py-9 xl:max-w-[32rem]"
      closeButtonClassName="hidden"
    >
      <div>
        <h1 className="bg-primary-50 px-6 py-3 text-neutral-800 text-p2 font-semibold mb-8">
          Suspend/Ban
        </h1>

        <div className="space-y-6">
          <div>
            <label className={labelClass}>Suspend/Ban</label>
            <Select defaultValue="suspend" className="w-full">
              <option value="suspend">Suspend</option>
              <option value="banned">Banned</option>
            </Select>
          </div>
          <div>
            <label className={labelClass}>Alasan</label>
            <Textarea placeholder="Masukkan alasan suspend/ban" className="w-full h-40" />
          </div>

          <Button type="button" className="w-full">
            Selesai
          </Button>
        </div>
      </div>
    </Modal>
  )
}
