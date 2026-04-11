import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Modal } from '@imphnen-frontend-service/ui/molecules';
import { useConfirmItem } from '../../_hooks/permissions/use-item';

interface IModalDeletePermission {
  isOpen: boolean;
  onClose: () => void;
  handleDelete?: () => Promise<boolean>;
  currentStep?: number;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
}

const ModalDeletePermission = ({
  isOpen,
  onClose,
  resetStep,
  handleDelete,
}: IModalDeletePermission) => {
  const { onConfirm } = useConfirmItem(onClose, resetStep, handleDelete, {
    success: 'Data permissions berhasil dihapus',
    error: 'Data permissions gagal dihapus',
  });

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
          alt="Delete?"
          width={148}
          className="self-center"
        />
        <div className="text-center">
          <h2 className="text-p1 font-semibold text-danger-500 mb-3">
            Delete Permissions
          </h2>
          <p className="text-p3 text-neutral-400">
            Apakah kamu yakin untuk menghapus permission ini? Menghapus data ini
            mungkin akan mempengaruhi fungsional sistem
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
          variant="primary"
          size="lg"
          className="w-full bg-danger-500 hover:bg-danger-600"
          onClick={onConfirm}
        >
          Hapus Item
        </Button>
      </Modal.Content>
    </Modal>
  );
};

export default ModalDeletePermission;
