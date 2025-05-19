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
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { LuLoader } from 'react-icons/lu';
import { z } from 'zod';
import { SigninAction } from '../_action/signin-action';
import { signInValidationSchema } from '../_validation/signin-validation';

export function SigninForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInValidationSchema>>({
    resolver: zodResolver(signInValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: SigninAction,
    onSuccess: () => {
      router.push('/');
    },
    onError: () => {
      form.resetField('password');
    },
  });

  const onSubmit = (values: z.infer<typeof signInValidationSchema>) => {
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

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? <LuLoader className="h-5 w-5 animate-spin" /> : 'Masuk'}
        </Button>
      </form>
    </Form>
  );
}
