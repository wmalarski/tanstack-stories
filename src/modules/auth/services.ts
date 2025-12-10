import { authClient } from "@/integrations/better-auth/client";

import { mutationOptions } from "@tanstack/react-query";

import type { AuthSchemaOutput } from "./validation";

export const signInMutationOptions = () => {
  return mutationOptions({
    mutationFn: async (data: AuthSchemaOutput) => {
      const response = await authClient.signIn.email(data);

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
  });
};

export const signUpMutationOptions = () => {
  return mutationOptions({
    mutationFn: async (data: AuthSchemaOutput) => {
      const response = await authClient.signUp.email({
        ...data,
        name: data.email,
      });

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
  });
};
