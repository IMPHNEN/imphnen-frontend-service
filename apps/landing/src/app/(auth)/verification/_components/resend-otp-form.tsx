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
import { useFormResendOTP } from '../_hooks/use-form-resend-otp';
import { usePostResendOTP } from '../_hooks/use-post-resend-otp';
import { ResendOTPValidationType } from '../_validation/resend-otp-validation';

export function ResendOTPForm() {
  const ref = useRef<TurnstileInstance | null>(null);

  const form = useFormResendOTP();

  const { mutate, isPending, error } = usePostResendOTP(form);

  const onSubmit = (values: ResendOTPValidationType) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          className="w-full"
          disabled={isPending || !form.watch('token')}
        >
          Kirim Ulang Kode OTP
        </Button>
      </form>
    </Form>
  );
}
