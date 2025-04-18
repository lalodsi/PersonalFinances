import { useQuery } from "@tanstack/react-query"
import { getMovements } from "../../api/movements"

export const useMovements = () => {
    const {data, isError, isLoading} = useQuery({
        queryKey: ['movements'],
        queryFn: getMovements
    })

    return {
        data, isError, isLoading
    }
}