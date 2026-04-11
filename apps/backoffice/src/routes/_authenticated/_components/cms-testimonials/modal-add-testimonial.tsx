import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Modal } from '@imphnen-frontend-service/ui/molecules';
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms';
import { useItem, useConfirmItem } from '../../_hooks/cms-testimonials/use-item';

interface IModalAddTestimonial {
  isOpen: boolean;
  onClose: () => void;
  handleAdd?: () => Promise<boolean>;
  currentStep?: number;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
  onDataCapture?: (data: any) => void;
}

const ModalAddTestimonial = ({
  isOpen,
  onClose,
  currentStep,
  nextStep,
  resetStep,
  handleAdd,
  onDataCapture,
}: IModalAddTestimonial) => {
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
      {currentStep === 1 && <StepOne nextStep={nextStep} onClose={onClose} onDataCapture={onDataCapture} />}
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
  onDataCapture?: (data: any) => void;
}

const StepOne = ({ nextStep, onDataCapture }: IStepOneProps) => {
  const { form, onSubmit } = useItem(nextStep, undefined, onDataCapture);

  return (
    <>
      <Modal.Header>
        <h2 className="text-p1 font-semibold text-primary-500 mb-3">
          Tambah Testimonial
        </h2>
      </Modal.Header>
      <Modal.Content>
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <ControlledInputField
              control={form.control}
              label="Role"
              name="role"
              type="text"
              placeholder="Masukkan Role (e.g. Software Engineer)"
              size="lg"
              className="w-full"
            />
            <ControlledInputField
              control={form.control}
              label="Konten Testimonial"
              name="content"
              type="text"
              placeholder="Masukkan Konten Testimonial"
              size="lg"
              className="w-full"
            />
          </div>

          <Button variant="primary" size="lg" className="w-full" type="submit">
            Tambah Testimonial
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
      success: 'Data testimonial berhasil ditambahkan',
      error: 'Data testimonial gagal ditambahkan',
    }
  );

  return (
    <>
      <Modal.Header className="mb-10 text-center items-center">
        <h2 className="text-p1 font-semibold text-primary-500 mb-3">
          Tambah Testimonial
        </h2>
        <p className="text-p3 text-center text-neutral-400">
          Apakah kamu yakin ingin
          <br /> menambahkan testimonial ini?
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

export default ModalAddTestimonial;
