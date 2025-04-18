import { InvalidateQueryFilters, QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteMovement } from "../../api/movements"

export const useDeleteMovements = () => {
    const queryClient = useQueryClient()

    const {mutate, isPending} = useMutation({
        mutationKey: ['deleteMovement'],
        mutationFn: deleteMovement,
        onSuccess: () => {
            queryClient.invalidateQueries(['movements'])
        }
    })

    return {
        mutate, isPending
    }
}