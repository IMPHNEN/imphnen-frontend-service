import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Modal } from '@imphnen-frontend-service/ui/molecules';
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms';
import { useItem, useConfirmItem } from '../_hook/use-item';

interface IModalAddRole {
  isOpen: boolean;
  onClose: () => void;
  handleAdd?: () => Promise<boolean>;
  currentStep?: number;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
}

const ModalAddRole = ({
  isOpen,
  onClose,
  currentStep,
  nextStep,
  resetStep,
  handleAdd,
}: IModalAddRole) => {
  return (
    <Modal
      className="min-w-[400px] bg-primary-50 rounded-lg p-[40px] flex flex-col gap-0 text-center"
      isOpen={isOpen}
      onClose={() => {
        onClose();
        resetStep();
      }}
      disableEscapeKeyDown={true}
    >
      {currentStep === 1 && <StepOne nextStep={nextStep} onClose={onClose} />}
      {currentStep === 2 && (
        <StepTwo
          onClose={onClose}
          handleAdd={handleAdd}
          resetStep={resetStep}
        />
      )}
    </Modal>
  );
};

interface IStepOneProps {
  nextStep: () => void;
  onClose: () => void;
}

const StepOne = ({ nextStep }: IStepOneProps) => {
  const { form, onSubmit } = useItem(nextStep);

  return (
    <>
      <Modal.Header>
        <h2 className="text-p1 font-semibold text-primary-500 mb-3">
          Tambah Roles
        </h2>
      </Modal.Header>
      <Modal.Content>
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
              {[
                'Gacha Items',
                'Gacha Roll',
                'Roll',
                'Users',
                'Gacha Claim',
              ].map((title) => (
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
              ))}
            </div>
          </div>

          <Button variant="primary" size="lg" className="w-full" type="submit">
            Tambah Role
          </Button>
        </form>
      </Modal.Content>
    </>
  );
};

interface IStepTwoProps {
  onClose: () => void;
  handleAdd?: () => Promise<boolean>;
  resetStep: () => void;
}

const StepTwo = ({ onClose, handleAdd, resetStep }: IStepTwoProps) => {
  const { onConfirm, onCancel } = useConfirmItem(
    onClose,
    resetStep,
    handleAdd,
    {
      success: 'Data role berhasil ditambahkan',
      error: 'Data role gagal ditambahkan',
    }
  );

  return (
    <>
      <Modal.Header className="mb-10 text-center items-center">
        <h2 className="text-p1 font-semibold text-primary-500 mb-3">
          Tambah Roles
        </h2>
        <p className="text-p3 text-center text-neutral-400">
          Apakah kamu yakin ingin
          <br /> menambahkan role ini?
        </p>
      </Modal.Header>
      <Modal.Content className="flex mb-0 gap-4">
        <Button
          variant="bordered"
          size="lg"
          className="w-full"
          onClick={onCancel}
        >
          Batal
        </Button>
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={onConfirm}
        >
          Tambahkan
        </Button>
      </Modal.Content>
    </>
  );
};

export default ModalAddRole;
