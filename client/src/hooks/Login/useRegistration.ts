import { useMutation } from "@tanstack/react-query";
import { postRegistration } from "../../api/users";

export const useRegistration = () => {
    const {mutate, data, isPending, isSuccess, isError} = useMutation({
        mutationKey: ['register'],
        mutationFn: postRegistration
    })


    return {data, mutate, isPending, isSuccess, isError}
}