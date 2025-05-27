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
import { LuLoaderCircle } from 'react-icons/lu';
import { usePostResetPassword } from '../_hooks/use-post-reset-password';
import { useResetPasswordForm } from '../_hooks/use-reset-password-form';
import { ResetPasswordValidationSchema } from '../_validation/reset-password-validation';

export function ResetPasswordForm() {
  const form = useResetPasswordForm();
  const { mutate, error, isPending } = usePostResetPassword(form);

  const onSubmit = (values: ResetPasswordValidationSchema) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      {error && (
        <div className="p-2 text-xs bg-red-50 border border-red-200 text-red-800 rounded-sm w-full">
          {(error as Error).message}
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <LuLoaderCircle className="size-5 animate-spin" />
          ) : (
            'Ubah password'
          )}
        </Button>
      </form>
    </Form>
  );
}
