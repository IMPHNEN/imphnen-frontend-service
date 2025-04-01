import { Button } from '@imphnen-frontend-service/ui/atoms';
import { InputForm, Modal } from '@imphnen-frontend-service/ui/molecules';

interface IModalProcessDelivery {
  isOpen: boolean;
  onClose: () => void;
  handleProcessDelivery?: () => void;
}

const ModalProcessDelivery = ({
  isOpen,
  onClose,
  handleProcessDelivery,
}: IModalProcessDelivery) => {
  return (
    <Modal
      className="min-w-[400px] bg-primary-50 rounded-lg p-[40px] flex flex-col gap-8 text-center"
      isOpen={isOpen}
      onClose={onClose}
      disableEscapeKeyDown={true}
    >
      <Modal.Header>
        <h2 className="text-p1 font-semibold text-primary-500 mb-3">
          Delivery Process
        </h2>
        <p className="text-p3 text-neutral-400">
          Lakukan pengiriman hadiah gacha untuk pengguna di bawah ini, jika
          sudah ubah status menjadi “Delivered”.
        </p>
      </Modal.Header>
      <Modal.Content className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <InputForm
            label="Nama Lengkap"
            type="text"
            placeholder="Masukkan Nama Lengkap"
            value="Ahmad Wiyana"
            size="lg"
            className="w-full"
            readOnly
          />
          <InputForm
            label="Item yang didapatkan"
            type="text"
            placeholder="Masukkan Nama Item"
            value="Lanyard + ID Card"
            size="lg"
            className="w-full"
            readOnly
          />
          <InputForm
            label="Alamat Pengiriman"
            type="text"
            placeholder="Masukkan Alamat Pengiriman"
            value="Jl. Pantai Cibaduyut Indah"
            size="lg"
            className="w-full"
            readOnly
          />
          <InputForm
            label="Status"
            type="text"
            placeholder="Isi Status Pengiriman"
            value="Lanyard + ID Card"
            size="lg"
            className="w-full"
            readOnly
          />
        </div>

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => handleProcessDelivery && handleProcessDelivery()}
        >
          Proses Pengiriman
        </Button>
      </Modal.Content>
    </Modal>
  );
};

export default ModalProcessDelivery;
