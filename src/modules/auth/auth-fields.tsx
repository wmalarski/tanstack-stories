import {
  FieldError,
  FieldGroup,
  FieldLabel,
  Field as FieldRoot,
  FieldSet,
} from "@/components/ui/field";
import { FormError } from "@/components/ui/form-error";
import { Input } from "@/components/ui/input";

import { Field, type FormStore } from "@formisch/react";
import type { APIError } from "better-auth";

import type { AuthSchema } from "./validation";

type AuthFieldsProps = {
  result?: APIError["body"];
  of: FormStore<typeof AuthSchema>;
};

export const AuthFields = ({ result, of }: AuthFieldsProps) => {
  return (
    <FieldSet>
      <FormError message={result?.message} />

      <FieldGroup>
        <Field of={of} path={["email"]}>
          {(field) => (
            <FieldRoot data-invalid={!field.isValid}>
              <FieldLabel>Email</FieldLabel>
              <Input
                {...field.props}
                disabled={of.isSubmitting}
                inputMode="email"
                placeholder="Email"
                required
                type="email"
                value={field.input}
                width="full"
              />
              <FieldError
                errors={field.errors?.map((message) => ({ message }))}
              />
            </FieldRoot>
          )}
        </Field>

        <Field of={of} path={["password"]}>
          {(field) => (
            <FieldRoot data-invalid={!field.isValid}>
              <FieldLabel>Password</FieldLabel>
              <Input
                {...field.props}
                disabled={of.isSubmitting}
                name="password"
                placeholder="Password"
                required
                type="password"
                value={field.input}
                width="full"
              />
              <FieldError
                errors={field.errors?.map((message) => ({ message }))}
              />
            </FieldRoot>
          )}
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};
