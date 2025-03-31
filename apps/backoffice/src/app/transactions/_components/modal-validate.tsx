import { Button } from '@imphnen-frontend-service/ui/atoms';
import { InputForm, Modal } from '@imphnen-frontend-service/ui/molecules';

interface IModalValidate {
  isOpen: boolean;
  onClose: () => void;
  handleValid?: () => void;
  handleInvalid?: () => void;
}

const ModalValidate = ({
  isOpen,
  onClose,
  handleValid,
  handleInvalid,
}: IModalValidate) => {
  return (
    <Modal
      className="min-w-[400px] bg-primary-50 rounded-lg p-[40px] flex flex-col gap-8 text-center"
      isOpen={isOpen}
      onClose={onClose}
      disableEscapeKeyDown={true}
    >
      <Modal.Header className="mb-0 text-center items-center">
        <h2 className="text-p1 font-semibold text-primary-500 mb-3">
          Validasi Transaksi
        </h2>
      </Modal.Header>
      <Modal.Content className="flex flex-col gap-8">
        <InputForm
          label="Nomor Transaksi"
          type="text"
          placeholder="Masukkan Nomor Transaksi"
          value="2502133Y9AFVBO"
          size="lg"
          className="w-full"
        />
        <div className="flex gap-4">
          <Button
            variant="bordered"
            size="lg"
            className="w-full border-danger-500 text-danger-500 hover:border-danger-700 hover:text-danger-700"
            onClick={() => handleInvalid && handleInvalid()}
          >
            Tidak Valid
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => handleValid && handleValid()}
          >
            Valid
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default ModalValidate;
