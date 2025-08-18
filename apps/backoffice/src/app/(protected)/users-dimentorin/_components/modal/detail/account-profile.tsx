import { Button, Input } from "@imphnen-frontend-service/ui/atoms";
import { cn } from "@imphnen-frontend-service/utils";
import { FC, useState } from "react";
import { ModalDelete } from "../delete";
import { ModalProps } from "../type";
import { ModalSuspendOrBan } from "../suspend-or-ban";

const labelClass = cn('text-neutral-800 text-[10px] font-semibold mb-1.5 inline-block md:text-xs md:mb-2 xl:text-[15px]')

export const AccountProfile: FC<ModalProps> = ({ setOpen }) => {
  const [openDelete, setOpenDelete] = useState(false)
  const [openSuspendOrBan, setOpenSuspendOrBan] = useState(false)

  return (
    <div>
      <div className="flex items-center gap-x-8 mb-8">
        <div className="size-[100px] rounded-full overflow-hidden">
          <img src="/images/asd687hwq6nds4dfjj2983.webp" alt="Profile" className="w-full object-cover" />
        </div>
        <div>
          <Button type="button" size="sm" variant="bordered" className="mb-4">
            Upload Foto
          </Button>
          <p className="text-neutral-400 font-medium">
            Setidaknya rekomendasi ukuran 240x240 px. <br />
            .jpg, .jpeg, .png diperbolehkan
          </p>
        </div>
      </div>

      <div>
        <div className="mb-8">
          <h1 className="mb-7 text-p2 font-semibold">Informasi Pribadi</h1>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className={labelClass}>Nama Depan</label>
              <Input type="text" className="min-w-full w-full" placeholder="Nama Depan" />
            </div>
            <div>
              <label className={labelClass}>Nama Belakang</label>
              <Input type="text" className="min-w-full w-full" placeholder="Nama Belakang" />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <Input type="email" className="min-w-full w-full" placeholder="Email" />
            </div>
            <div>
              <label className={labelClass}>Nomor Telepon</label>
              <Input type="text" className="min-w-full w-full" placeholder="+62 81234567890" />
            </div>
          </div>
        </div>

        <div>
          <h1 className="mb-7 text-p2 font-semibold">Status Akun</h1>
          <div className="flex items-center gap-5">
            <Button
              type="button"
              size="sm"
              variant="bordered"
              className="border-danger-500 text-danger-500"
              onClick={() => setOpenSuspendOrBan(true)}
            >
              Suspend/Ban
            </Button>
            <Button type="button" size="sm" variant="danger" onClick={() => setOpenDelete(true)}>
              Delete Akun
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-x-5">
          <Button type="button" variant="bordered" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button type="button" disabled>
            Simpan
          </Button>
        </div>
      </div>

      <ModalDelete open={openDelete} setOpen={setOpenDelete} />
      <ModalSuspendOrBan open={openSuspendOrBan} setOpen={setOpenSuspendOrBan} />
    </div>
  )
}
