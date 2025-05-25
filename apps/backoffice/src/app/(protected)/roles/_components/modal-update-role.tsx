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
    success: 'Perubahan roles berhasil dilakukan',
    error: 'Perubahan roles gagal dilakukan',
  });

  return (
    <Modal
      className="min-w-[400px] bg-primary-50 rounded-lg p-[40px] flex flex-col gap-0 text-center"
      isOpen={isOpen}
      onClose={onClose}
      disableEscapeKeyDown={true}
    >
      <Modal.Header>
        <h2 className="text-p1 font-semibold text-primary-500 mb-3">
          Update Roles
        </h2>
      </Modal.Header>
      <Modal.Content className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <InputField
            label="Nama Role"
            name="name"
            type="text"
            placeholder="Masukkan Nama Role"
            size="lg"
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-4 items-start overflow-auto">
          <span className="text-p3 font-medium text-neutral-800 sticky left-0">
            Permissions
          </span>
          <div className="flex gap-x-6 overflow-x-scroll">
            {['Gacha Items', 'Gacha Roll', 'Roll', 'Users', 'Gacha Claim'].map(
              (title) => (
                <div
                  key={title}
                  className="flex flex-col gap-4 select-none text-label2 font-medium text-neutral-900 "
                >
                  <span className="text-nowrap text-label1">{title}</span>
                  <div className="flex gap-[8px] items-center">
                    <input
                      type="checkbox"
                      id={`${title}-all`}
                      className="rounded"
                    />
                    <label htmlFor={`${title}-all`} className="text-nowrap">
                      Check All
                    </label>
                  </div>
                  <hr className="border-blue-200" />
                  <div className="flex flex-col items-start gap-4 mb-4">
                    <div className="flex gap-[8px] items-center">
                      <input type="checkbox" id={`${title}-read`} />
                      <label htmlFor={`${title}-read`}>Read</label>
                    </div>
                    <div className="flex gap-[8px] items-center">
                      <input type="checkbox" id={`${title}-create`} />
                      <label htmlFor={`${title}-create`}>Create</label>
                    </div>
                    <div className="flex gap-[8px] items-center">
                      <input type="checkbox" id={`${title}-update`} />
                      <label htmlFor={`${title}-update`}>Update</label>
                    </div>
                    <div className="flex gap-[8px] items-center">
                      <input type="checkbox" id={`${title}-delete`} />
                      <label htmlFor={`${title}-delete`}>Delete</label>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          type="submit"
          onClick={onConfirm}
        >
          Update Role
        </Button>
      </Modal.Content>
    </Modal>
  );
};

export default ModalUpdatePermission;
