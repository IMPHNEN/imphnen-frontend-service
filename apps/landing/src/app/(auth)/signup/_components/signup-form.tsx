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
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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
  const [step, setStep] = useState(1);
  const [stepOneData, setStepOneData] = useState<z.infer<
    typeof stepOneSignupValidationSchema
  > | null>(null);

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
      secondForm.reset();
    },
  });

  const firstForm = useForm<z.infer<typeof stepOneSignupValidationSchema>>({
    resolver: zodResolver(stepOneSignupValidationSchema),
    defaultValues: {
      email: '',
      fullname: '',
      password: '',
      confirm_password: '',
    },
  });

  const secondForm = useForm<z.infer<typeof stepTwoSignupValidationSchema>>({
    resolver: zodResolver(stepTwoSignupValidationSchema),
    defaultValues: {
      phone_number: '',
      referral_code: '',
      referred_by: '',
      student_type: '',
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

            <FormField
              control={secondForm.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Telepon</FormLabel>
                  <FormControl>
                    <Input placeholder="081234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-x-4">
              <FormField
                control={secondForm.control}
                name="referral_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kode Referral</FormLabel>
                    <FormControl>
                      <Input placeholder="ABCD" maxLength={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={secondForm.control}
                name="referred_by"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referrer</FormLabel>
                    <FormControl>
                      <Input placeholder="Referral ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={secondForm.control}
              name="student_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Undergraduate" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
                disabled={isPending}
                className="flex items-center gap-2 hover:bg-[#5fbaef] bg-[#22a5f1]"
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
