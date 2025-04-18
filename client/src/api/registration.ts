import api from "./api";

const REGISTER_USER = "users/register"

export const postRegistration = async (props: unknown) => {
    const result = await api.post(REGISTER_USER, props)
    return result.data
}