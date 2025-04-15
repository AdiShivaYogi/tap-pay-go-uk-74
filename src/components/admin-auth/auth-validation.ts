
import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email("Introduceți un email valid"),
  password: z.string()
    .min(8, "Parola trebuie să aibă cel puțin 8 caractere")
    .regex(/[A-Z]/, "Parola trebuie să conțină cel puțin o literă mare")
    .regex(/[a-z]/, "Parola trebuie să conțină cel puțin o literă mică")
    .regex(/[0-9]/, "Parola trebuie să conțină cel puțin o cifră")
    .regex(/[!@#$%^&*()]/, "Parola trebuie să conțină cel puțin un caracter special"),
  inviteCode: z.string().min(1, "Codul de invitație este obligatoriu")
});
