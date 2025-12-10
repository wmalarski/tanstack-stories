import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppForm } from "@/integrations/tanstack-form";

import { useMutation } from "@tanstack/react-query";

import { AuthFields } from "./auth-fields";
import { signUpMutationOptions } from "./services";
import { AuthSchema } from "./validation";

type SignUpFormProps = {
  onSignInClick: () => void;
};

export const SignUpForm = ({ onSignInClick }: SignUpFormProps) => {
  const signInMutation = useMutation(signUpMutationOptions());

  const signUpForm = useAppForm({
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
    await signUpForm.handleSubmit();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col gap-4">
          <AuthFields error={signInMutation.error} form={signUpForm} />
          <signUpForm.Button type="submit">Sign Up</signUpForm.Button>
          <Button onClick={onSignInClick} type="button" variant="link">
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
