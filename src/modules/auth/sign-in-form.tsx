import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

import { Form, useForm } from "@formisch/react";
import type { APIError } from "better-auth";
import { useState } from "react";

import { AuthFields } from "./auth-fields";
import { AuthSchema, type AuthSchemaOutput } from "./validation";

// import { signInMutation } from "./services/actions";
// import type { APIErrorBody } from "./services/router";
// import { useUserContext } from "./user-context";

type SignInFormProps = {
  onSignUpClick: () => void;
};

export const SignInForm = ({ onSignUpClick }: SignInFormProps) => {
  //   const userContext = useUserContext();

  const [result, setResult] = useState<APIError["body"]>();

  const signInForm = useForm({
    initialInput: { email: "", password: "" },
    schema: AuthSchema,
  });

  //   const action = async (formData: FormData) => {
  //     const result = await signInMutation(formData);

  //     startTransition(async () => {
  //       setResult(result ?? undefined);

  //       if (!result) {
  //         userContext.invalidate();
  //       }
  //     });
  //   };

  const onSubmit = (output: AuthSchemaOutput) => {
    console.log("[output]", { output });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <Form
          className="flex flex-col gap-4"
          of={signInForm}
          onSubmit={onSubmit}
        >
          <AuthFields
            of={signInForm}
            pending={signInForm.isSubmitting}
            result={result}
          />
          <Button disabled={signInForm.isSubmitting} type="submit">
            {signInForm.isSubmitting ? <Spinner /> : null}
            Sign In
          </Button>
          <Button onClick={onSignUpClick} type="button" variant="link">
            Sign Up
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
};
