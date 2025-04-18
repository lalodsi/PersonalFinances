import { useMutation } from "@tanstack/react-query";
import { postRegistration } from "../../api/registration";

const useRegistration = () => {
    const {data, isPending, isSuccess, isError} = useMutation({
        mutationKey: ['register'],
        mutationFn: postRegistration
    })


    return [data, isPending, isSuccess, isError]
}