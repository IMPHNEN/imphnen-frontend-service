import { Button } from "@imphnen-frontend-service/ui/atoms";
import { Modal } from "@imphnen-frontend-service/ui/molecules";
import { FC } from "react";

type ModalDeleteProps = {
  open: boolean
  setOpen: (open: boolean) => void
  hadnleDelete?: () => void
}

export const ModalDelete: FC<ModalDeleteProps> = ({ open, setOpen, hadnleDelete }) => {
  return (
    <Modal
      className="min-w-[400px] bg-primary-50 rounded-lg p-[40px] flex flex-col gap-8 text-center"
      isOpen={open}
      onClose={() => setOpen(false)}
      closeButtonClassName="hidden"
    >
      <Modal.Header className="gap-8">
        <img
          src="/chibi-delete.webp"
          alt="Delete item?"
          width={148}
          className="self-center"
        />
        <div className="text-center">
          <h2 className="text-p1 font-semibold text-danger-500 mb-3">
            Hapus Akun
          </h2>
          <p className="text-p3 text-neutral-400">
            Apakah kamu yakin untuk menghapus akun ini?
          </p>
        </div>
      </Modal.Header>
      <Modal.Content className="flex gap-4">
        <Button
          variant="bordered"
          size="lg"
          className="w-full border-danger-500 text-danger-500 hover:bg-danger-50 hover:text-danger-600 hover:border-danger-600"
          onClick={() => setOpen(false)}
        >
          Batal
        </Button>
        <Button
          variant="danger"
          size="lg"
          className="w-full"
          onClick={() => hadnleDelete?.()}
        >
          Hapus Akun
        </Button>
      </Modal.Content>
    </Modal>
  )
}
