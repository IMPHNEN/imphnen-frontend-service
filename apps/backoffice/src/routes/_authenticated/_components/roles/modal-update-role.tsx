import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Modal } from '@imphnen-frontend-service/ui/molecules';
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms';

interface IModalUpdateRole {
  isOpen: boolean;
  onClose: () => void;
  handleUpdate?: () => Promise<boolean>;
  currentStep?: number;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
  initialValues?: { name?: string };
  onDataCapture?: (data: any) => void;
}

const ModalUpdateRole = ({
  isOpen,
  onClose,
  resetStep,
  handleUpdate,
  initialValues,
  onDataCapture,
}: IModalUpdateRole) => {
  const form = useForm<{ name: string }>({
    mode: 'all',
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(initialValues);
    }
  }, [isOpen, initialValues]);

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      onDataCapture?.(data);
      if (handleUpdate) await handleUpdate();
      toast.success('Perubahan roles berhasil dilakukan');
      onClose();
      resetStep();
    } catch (error) {
      console.log(error);
      toast.error('Perubahan roles gagal dilakukan');
    }
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
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <ControlledInputField
              control={form.control}
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
          >
            Update Role
          </Button>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default ModalUpdateRole;
