import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/integrations/better-auth/client";
import { useAppForm } from "@/integrations/tanstack-form";

import type { APIError } from "better-auth";
import { useState } from "react";

import { AuthFields } from "./auth-fields";
import { AuthSchema } from "./validation";

type SignInFormProps = {
  onSignUpClick: () => void;
};

export const SignInForm = ({ onSignUpClick }: SignInFormProps) => {
  const [result, setResult] = useState<APIError["body"]>();

  const signInForm = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async (data) => {
      const response = await authClient.signIn.email(data.value);

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
    await signInForm.handleSubmit();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col gap-4">
          <AuthFields form={signInForm} result={result} />
          <signInForm.Button type="submit">Sign In</signInForm.Button>
          <Button onClick={onSignUpClick} type="button" variant="link">
            Sign Up
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
