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
import { zodResolver } from '@hookform/resolvers/zod';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuLoader } from 'react-icons/lu';
import { z } from 'zod';
import { SignupAction } from '../_actions/signup-action';
import {
  signupValidationSchema,
  stepOneSignupValidationSchema,
  stepTwoSignupValidationSchema,
} from '../_validation/signup-validation';

export function SignupForm() {
  const router = useRouter();
  const ref = useRef<TurnstileInstance | null>(null);

  const [step, setStep] = useState(1);
  const [stepOneData, setStepOneData] = useState<z.infer<
    typeof stepOneSignupValidationSchema
  > | null>(null);

  const firstForm = useForm<z.infer<typeof stepOneSignupValidationSchema>>({
    resolver: zodResolver(stepOneSignupValidationSchema),
    defaultValues: {
      email: '',
      phone_number: '',
      fullname: '',
      password: '',
      confirm_password: '',
    },
  });

  const secondForm = useForm<z.infer<typeof stepTwoSignupValidationSchema>>({
    resolver: zodResolver(stepTwoSignupValidationSchema),
    defaultValues: {
      token: '',
    },
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: z.infer<typeof signupValidationSchema>) => {
      const result = await SignupAction(data);

      return {
        ...result,
        email: data.email,
      };
    },
    onSuccess: ({ email }) => {
      router.push(`/verification?ref=${email}`);
    },
    onError: () => {
      ref.current?.reset();
      secondForm.resetField('token');
    },
  });

  const handleFirstSubmit = (
    values: z.infer<typeof stepOneSignupValidationSchema>
  ) => {
    setStepOneData(values);
    setStep(2);
  };

  const handleSecondSubmit = (
    values: z.infer<typeof stepTwoSignupValidationSchema>
  ) => {
    if (stepOneData) {
      mutate({ ...stepOneData, ...values });
    }
  };

  return (
    <>
      {step === 1 && (
        <Form {...firstForm}>
          <form
            onSubmit={firstForm.handleSubmit(handleFirstSubmit)}
            className="space-y-4"
          >
            <FormField
              control={firstForm.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama Lengkap" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={firstForm.control}
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
              control={firstForm.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Telepon</FormLabel>
                  <FormControl>
                    <Input placeholder="08123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={firstForm.control}
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

            <FormField
              control={firstForm.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-[#5fbaef] hover:bg-[#22a5f1]"
            >
              Selanjutnya
            </Button>
          </form>
        </Form>
      )}

      {step === 2 && (
        <Form {...secondForm}>
          <form
            onSubmit={secondForm.handleSubmit(handleSecondSubmit)}
            className="space-y-4"
          >
            {error && (
              <div className="p-2 text-xs bg-red-50 border border-red-200 text-red-800 rounded-sm">
                {(error as Error).message}
              </div>
            )}

            <Turnstile
              ref={ref}
              siteKey={String(process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY)}
              onSuccess={(token) => secondForm.setValue('token', token)}
              options={{
                theme: 'light',
                size: 'flexible',
                language: 'id',
              }}
            />

            <div className="flex justify-between">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setStep(1)}
              >
                Kembali
              </Button>
              <Button
                type="submit"
                disabled={isPending || !secondForm.watch('token')}
              >
                {isPending ? (
                  <LuLoader className="h-5 w-5 animate-spin" />
                ) : (
                  'Daftar'
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
