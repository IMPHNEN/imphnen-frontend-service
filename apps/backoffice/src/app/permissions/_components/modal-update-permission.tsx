import { Button } from '@imphnen-frontend-service/ui/atoms';
import { InputField, Modal } from '@imphnen-frontend-service/ui/molecules';
import { useConfirmItem } from '../_hook/use-item';

interface IModalUpdatePermission {
  isOpen: boolean;
  onClose: () => void;
  handleUpdate?: () => Promise<boolean>;
  currentStep?: number;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
}

const ModalUpdatePermission = ({
  isOpen,
  onClose,
  resetStep,
  handleUpdate,
}: IModalUpdatePermission) => {
  const { onConfirm } = useConfirmItem(onClose, resetStep, handleUpdate, {
    success: 'Perubahan permissions berhasil dilakukan',
    error: 'Perubahan permissions gagal dilakukan',
  });

  return (
    <Modal
      className="min-w-[400px] bg-primary-50 rounded-lg p-[40px] flex flex-col gap-3 text-center"
      isOpen={isOpen}
      onClose={onClose}
      disableEscapeKeyDown={true}
    >
      <Modal.Header>
        <h2 className="text-p1 font-semibold text-primary-500">
          Update Permissions
        </h2>
      </Modal.Header>
      <Modal.Content className="flex flex-col gap-8">
        <InputField
          label="Name"
          name="name"
          type="text"
          placeholder="Nama Permission"
          size="lg"
          className="w-full"
        />

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          type="submit"
          onClick={onConfirm}
        >
          Update Permission
        </Button>
      </Modal.Content>
    </Modal>
  );
};

export default ModalUpdatePermission;
