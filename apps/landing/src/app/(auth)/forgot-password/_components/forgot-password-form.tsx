'use client';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@components';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { useRef, useState } from 'react';
import { LuLoader } from 'react-icons/lu';
import { useFormForgotPassword } from '../_hooks/use-form-forgot-password';
import { usePostForgotPassowrd } from '../_hooks/use-post-forgot-password';
import { ForgotPasswordValidationType } from '../_validation/forgot-password-validation';

export function ForgotPasswordForm() {
  const ref = useRef<TurnstileInstance | null>(null);

  const [step, setStep] = useState<number>(1);
  const [emailValue, setEmailValue] = useState<string>('');

  const form = useFormForgotPassword();
  const { mutate, isPending, error } = usePostForgotPassowrd(form);

  const handleFirstStep = (values: ForgotPasswordValidationType) => {
    setEmailValue(values.email);
    setStep(2);
  };

  const handleSecondStep = () => {
    mutate({ email: emailValue, token: form.getValues('token') });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={
          step === 1
            ? form.handleSubmit(handleFirstStep)
            : (e) => {
                e.preventDefault();
                handleSecondStep();
              }
        }
        className="w-full space-y-4"
      >
        {error && (
          <div className="p-2 text-xs bg-red-50 border border-red-200 text-red-800 rounded-sm">
            {(error as Error).message}
          </div>
        )}

        {step === 1 && (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="emailmu@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {step === 2 && (
          <Turnstile
            ref={ref}
            siteKey={String(process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY)}
            onSuccess={(token) => form.setValue('token', token)}
            options={{ theme: 'light', size: 'flexible', language: 'id' }}
          />
        )}

        <Button
          type="submit"
          disabled={isPending || (step === 2 && !form.watch('token'))}
          className="w-full hover:bg-[#5fbaef] bg-[#22a5f1] font-bold"
        >
          {isPending ? (
            <LuLoader className="h-5 w-5 animate-spin" />
          ) : step === 1 ? (
            'Selanjutnya'
          ) : (
            'Reset password'
          )}
        </Button>
      </form>
    </Form>
  );
}
