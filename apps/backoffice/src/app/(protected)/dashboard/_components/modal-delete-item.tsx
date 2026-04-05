import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Modal } from '@imphnen-frontend-service/ui/molecules';

interface IModalDeleteItem {
  isOpen: boolean;
  onClose: () => void;
  handleDeleteItem?: () => Promise<boolean>;
}

const ModalDeleteItem = ({
  isOpen,
  onClose,
  handleDeleteItem,
}: IModalDeleteItem) => {
  return (
    <Modal
      className="min-w-[400px] bg-primary-50 rounded-lg p-[40px] flex flex-col gap-8 text-center"
      isOpen={isOpen}
      onClose={onClose}
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
            Delete Item
          </h2>
          <p className="text-p3 text-neutral-400">
            Apakah kamu yakin untuk menghapus item ini?
          </p>
        </div>
      </Modal.Header>
      <Modal.Content className="flex gap-4">
        <Button
          variant="secondary"
          size="lg"
          className="w-full"
          onClick={onClose}
        >
          Batal Hapus
        </Button>
        <Button
          variant="danger"
          size="lg"
          className="w-full"
          onClick={async () => {
            if (handleDeleteItem) await handleDeleteItem();
            onClose();
          }}
        >
          Hapus Item
        </Button>
      </Modal.Content>
    </Modal>
  );
};

export default ModalDeleteItem;
