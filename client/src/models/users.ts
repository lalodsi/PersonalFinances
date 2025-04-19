import { z } from "zod";

export const registrationModelSchema = z.object({
    name: z.string(),
    email: z.string(),
    passphrase: z.string(),
})

export const authenticationModelSchema = z.object({
    user: z.string(),
    passphrase: z.string(),
})

export type AuthenticationModel = z.infer<typeof authenticationModelSchema>
export type RegistrationModel = z.infer<typeof registrationModelSchema>