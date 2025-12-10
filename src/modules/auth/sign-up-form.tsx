import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/integrations/better-auth/client";
import { useAppForm } from "@/integrations/tanstack-form";

import type { APIError } from "better-auth";
import { useState } from "react";

import { AuthFields } from "./auth-fields";
import { AuthSchema } from "./validation";

type SignUpFormProps = {
  onSignInClick: () => void;
};

export const SignUpForm = ({ onSignInClick }: SignUpFormProps) => {
  const [result, setResult] = useState<APIError["body"]>();

  const signUpForm = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async (data) => {
      const response = await authClient.signUp.email({
        ...data.value,
        name: data.value.email,
      });

      if (response.error) {
        setResult(response);
        return;
      }

      console.log("[data]", response.data);
    },
    validators: {
      onSubmit: AuthSchema,
    },
  });

  const formAction = async () => {
    await signUpForm.handleSubmit();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col gap-4">
          <AuthFields form={signUpForm} result={result} />
          <signUpForm.Button type="submit">Sign Up</signUpForm.Button>
          <Button onClick={onSignInClick} type="button" variant="link">
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
