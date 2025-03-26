import { FC, ReactElement } from 'react';
import { Button, PasswordInput } from '@imphnen-frontend-service/ui/atoms';
import { InputForm } from '@imphnen-frontend-service/ui/molecules';

export const Components: FC = (): ReactElement => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white border border-primary-200 shadow-lg p-[60px] text-center flex flex-col gap-8 rounded-2xl">
        <img src="/logos/logo.svg" alt="" className="h-[70px] w-auto" />
        <h1 className="text-primary-500 text-p1 font-semibold">
          Welcome to IMPHNEN Backoffice
        </h1>
        <InputForm
          label="Email"
          placeholder="Masukkan Email"
          type="email"
          size="lg"
        />
        <div className="flex gap-[8px] flex-col">
          <div className="self-start text-p3 font-medium">Password</div>
          <PasswordInput placeholder="Masukkan Password" size="lg" />
        </div>
        <Button>Login</Button>
      </div>
    </div>
  );
};

export default Components;
