import { serverResponseSchema } from "../models/api";
import { AuthenticationModel, RegistrationModel } from "../models/users";
import api from "./api";

const REGISTER_USER = "users/register"
const AUTHENTICATE_USER = "users/authenticate"

export const postRegistration = async (props: RegistrationModel) => {
    const result = await api.post(REGISTER_USER, props)
    return serverResponseSchema.parse(result.data)
}

export const postAuthenticate = async (props: AuthenticationModel) => {
    const result = await api.post(AUTHENTICATE_USER, props)
    return serverResponseSchema.parse(result.data)
}