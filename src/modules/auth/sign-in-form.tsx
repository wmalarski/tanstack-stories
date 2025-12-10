import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppForm } from "@/integrations/tanstack-form";

import { useMutation } from "@tanstack/react-query";

import { AuthFields } from "./auth-fields";
import { signInMutationOptions } from "./services";
import { AuthSchema } from "./validation";

type SignInFormProps = {
  onSignUpClick: () => void;
};

export const SignInForm = ({ onSignUpClick }: SignInFormProps) => {
  const signInMutation = useMutation(signInMutationOptions());

  const signInForm = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async (data) => {
      await signInMutation.mutateAsync(data.value);
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
          <AuthFields error={signInMutation.error} form={signInForm} />
          <signInForm.Button type="submit">Sign In</signInForm.Button>
          <Button onClick={onSignUpClick} type="button" variant="link">
            Sign Up
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
