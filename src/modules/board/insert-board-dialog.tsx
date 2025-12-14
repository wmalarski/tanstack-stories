import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { FormError } from "@/components/ui/form-error";
import { useAppForm } from "@/integrations/tanstack-form";

import { useMutation } from "@tanstack/react-query";

import { insertBoardMutationOptions } from "./services";
import { type InsertBoardArgs, InsertBoardSchema } from "./validation";

export const InsertBoardDialog = () => {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Open Dialog
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <InsertBoardForm />
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const InsertBoardForm = () => {
  const signInMutation = useMutation(insertBoardMutationOptions());

  const insertBoardForm = useAppForm({
    defaultValues: {
      description: "",
      title: "",
    } as InsertBoardArgs,
    onSubmit: async (data) => {
      await signInMutation.mutateAsync(data.value);
    },
    validators: {
      onSubmit: InsertBoardSchema,
    },
  });

  const formAction = async () => {
    await insertBoardForm.handleSubmit();
  };

  return (
    <insertBoardForm.AppForm>
      <form action={formAction} className="flex flex-col gap-4">
        <FieldSet>
          <FormError message={signInMutation.error?.message} />

          <FieldGroup>
            <insertBoardForm.AppField name="title">
              {(field) => (
                <Field data-invalid={!field.state.meta.isValid}>
                  <FieldLabel>Title</FieldLabel>
                  <field.Input placeholder="Title" required width="full" />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </insertBoardForm.AppField>

            <insertBoardForm.AppField name="description">
              {(field) => (
                <Field data-invalid={!field.state.meta.isValid}>
                  <FieldLabel>Description</FieldLabel>
                  <field.Input placeholder="Description" width="full" />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </insertBoardForm.AppField>
          </FieldGroup>
        </FieldSet>
        <insertBoardForm.Button type="submit">Insert</insertBoardForm.Button>
      </form>
    </insertBoardForm.AppForm>
  );
};
