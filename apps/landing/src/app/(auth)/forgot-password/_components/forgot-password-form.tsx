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
import { useRef } from 'react';
import { LuLoader } from 'react-icons/lu';
import { useFormForgotPassword } from '../_hooks/use-form-forgot-password';
import { usePostForgotPassowrd } from '../_hooks/use-post-forgot-password';
import { ForgotPasswordValidationType } from '../_validation/forgot-password-validation';

export function ForgotPasswordForm() {
  const ref = useRef<TurnstileInstance | null>(null);

  const form = useFormForgotPassword();
  const { mutate, isPending, error } = usePostForgotPassowrd(form);

  const onSubmit = (values: ForgotPasswordValidationType) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        {error && (
          <div className="p-2 text-xs bg-red-50 border border-red-200 text-red-800 rounded-sm">
            {(error as Error).message}
          </div>
        )}

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

        <Turnstile
          ref={ref}
          siteKey={String(process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY)}
          onSuccess={(token) => form.setValue('token', token)}
          options={{
            theme: 'light',
            size: 'flexible',
            language: 'id',
          }}
        />

        <Button
          type="submit"
          disabled={isPending}
          className="w-full hover:bg-[#5fbaef] bg-[#22a5f1] font-bold"
        >
          {isPending ? (
            <LuLoader className="h-5 w-5 animate-spin" />
          ) : (
            'Reset password'
          )}
        </Button>
      </form>
    </Form>
  );
}
