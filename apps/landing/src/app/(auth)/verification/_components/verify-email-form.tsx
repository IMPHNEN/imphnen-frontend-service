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
import { LuLoader } from 'react-icons/lu';
import { useFormVerifyEmail } from '../_hooks/use-form-verify-email';
import { usePostVerifyEmail } from '../_hooks/use-post-verify-email';
import { type VerifyEmailValidationType } from '../_validation/verify-email-validation';

export function VerifyEmailForm() {
  const form = useFormVerifyEmail();
  const { mutate, isPending, error } = usePostVerifyEmail(form);

  const onSubmit = (values: VerifyEmailValidationType) => {
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

        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OTP</FormLabel>
              <FormControl>
                <Input placeholder="123456" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isPending}
          className="w-full hover:bg-[#5fbaef] bg-[#22a5f1] font-bold"
        >
          {isPending ? (
            <LuLoader className="h-5 w-5 animate-spin" />
          ) : (
            'Verifikasi'
          )}
        </Button>
      </form>
    </Form>
  );
}
