import { movement } from "../models/movements";
import api from "./api";

const GET_MOVEMENTS = "movements/"

export const getMovements = async () => {
    const result = await api.get(GET_MOVEMENTS)
    return result.data as movement[]
}

export const deleteMovement = async (expenseId: string) => {
    const result = await api.delete(`${GET_MOVEMENTS}/${expenseId}`)
    return result.data
}