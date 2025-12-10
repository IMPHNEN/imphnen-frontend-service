import { FC, ReactElement } from 'react';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { useLogin } from './_hooks/use-login';
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms';

export const Components: FC = (): ReactElement => {
  const { form, onSubmit, isLoading } = useLogin();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white border border-primary-200 shadow-lg p-[60px] text-center flex flex-col justify-items-stretch gap-8 rounded-2xl">
        <img src="/logos/logo.svg" alt="" className="h-[70px] w-auto" />
        <h1 className="text-primary-500 text-p1 font-semibold">
          Welcome to IMPHNEN Backoffice
        </h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
          <ControlledInputField
            control={form.control}
            label="Email"
            placeholder="Masukkan Email"
            type="email"
            name="email"
            size="lg"
            className="w-full"
            disabled={isLoading}
          />
          <ControlledInputField
            control={form.control}
            label="Password"
            placeholder="Masukkan Password"
            type="password"
            name="password"
            size="lg"
            className="w-full"
            disabled={isLoading}
          />
          <Button
            disabled={
              isLoading ||
              form.formState.isValidating ||
              !form.formState.isValid
            }
            type="submit"
            size="md"
            className="w-full"
          >
            {isLoading ? 'Loading...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Components;
