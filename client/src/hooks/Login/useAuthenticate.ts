import { useMutation } from "@tanstack/react-query"
import { postAuthenticate } from "../../api/users"

export const useAuthenticate = () => {
    const {mutate, data, isPending} = useMutation({
        mutationKey: ['login'],
        mutationFn: postAuthenticate
    })

    return {
        mutate,
        data,
        isPending
    }
}