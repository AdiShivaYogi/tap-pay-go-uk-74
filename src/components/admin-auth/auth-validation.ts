
import { z } from "zod";

// Different schemas for login and registration
export const loginFormSchema = z.object({
  email: z.string().email("Introduceți un email valid"),
  password: z.string().min(1, "Parola este obligatorie"),
});

export const registerFormSchema = z.object({
  email: z.string().email("Introduceți un email valid"),
  password: z.string()
    .min(8, "Parola trebuie să aibă cel puțin 8 caractere")
    .regex(/[A-Z]/, "Parola trebuie să conțină cel puțin o literă mare")
    .regex(/[a-z]/, "Parola trebuie să conțină cel puțin o literă mică")
    .regex(/[0-9]/, "Parola trebuie să conțină cel puțin o cifră")
    .regex(/[!@#$%^&*()]/, "Parola trebuie să conțină cel puțin un caracter special"),
  inviteCode: z.string().min(1, "Codul de invitație este obligatoriu"),
});

// Export a combined type that can be used for form values
export type AuthFormValues = z.infer<typeof loginFormSchema> & { inviteCode?: string };
