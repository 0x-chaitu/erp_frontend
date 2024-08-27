"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { PasswordInput } from "../ui/password-input";
import { signInWithEmailAndPassword } from "@/lib/firebase/firebaseAuth";


const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[!@#$%^&*]/, 'Password must contain at least one special character')
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm({ tenantId }: { tenantId: string }) {
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    email: ''
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async ({ email, password }: UserFormValue) => {
    try {
      const userUid = await signInWithEmailAndPassword(tenantId, email, password)
      // if (userUid) {
      //   await createSession(userUid);
      // }
    } catch (error) {
      console.log('Unexpected error: ', error);
    }
  };

  return <>
    <Form {...form}>
      <form
        className="w-full space-y-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  disabled={loading}
                  {...field}
                />
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
                <PasswordInput
                  type="password"
                  placeholder="Enter your password..."
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} className="ml-auto w-full" type="submit">
          Continue With Email
        </Button>
      </form>
    </Form>
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
    {/* <GithubSignInButton /> */}
  </>;
}
