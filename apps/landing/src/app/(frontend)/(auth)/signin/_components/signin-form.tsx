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
} from '@components/atoms';
import { LuLoader } from 'react-icons/lu';
import { useFormSignin } from '../_hooks/use-form-signin';
import { usePostSignin } from '../_hooks/use-post-signin';
import { type SignInValidationType } from '../_validation/signin-validation';

export function SigninForm() {
  const form = useFormSignin();
  const { mutate, isPending, error } = usePostSignin(form);

  const onSubmit = (values: SignInValidationType) => {
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
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
          {isPending ? <LuLoader className="h-5 w-5 animate-spin" /> : 'Masuk'}
        </Button>
      </form>
    </Form>
  );
}
