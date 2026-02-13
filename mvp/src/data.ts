import {faker} from '@faker-js/faker'

export interface SimpleMove {
    description: string;
    amount: string;
    date: Date;
}
export interface RecurrentMove {
    description: string;
    mensuality: number;
}
export interface MsiMove {
    description: string;
    totalAmount: number;
    numberOfAmounts: number;
    mensuality: number;
    startMonth: string
}

const generateMoves = (quantity: number): SimpleMove[] => Array(quantity).fill(null).map(
    () => ({
        description: faker.lorem.sentence({ min: 4, max: 8}),
        amount: faker.finance.amount({min: 100, max: 1500}),
        date: faker.date.recent({days: 240})
    })
)


const recurrentMoves: RecurrentMove[] = [
  { description: "Cursos ingles INBI", mensuality: 2250 },
  { description: "Tanda", mensuality: 600 },
  { description: "Natacion", mensuality: 2208 },
  { description: "Crossfit", mensuality: 2500 }
]

const msiMoves: MsiMove[] = [
  { description: "Iphone 16", totalAmount: 23999, numberOfAmounts: 12, mensuality: 2000, startMonth: "2025-03" },
  { description: "Vivaerobus", totalAmount: 5842.96, numberOfAmounts: 12, mensuality: 487, startMonth: "2025-09" },
  { description: "Dentalia", totalAmount: 20399, numberOfAmounts: 12, mensuality: 1700, startMonth: "2025-10" },
  { description: "Tenis Skechers Valeria", totalAmount: 2399, numberOfAmounts: 3, mensuality: 799, startMonth: "2025-10" },
  { description: "Suburbia san jeronimo", totalAmount: 4162, numberOfAmounts: 6, mensuality: 694, startMonth: "2025-10" },
  { description: "Roberts perisur", totalAmount: 8082, numberOfAmounts: 3, mensuality: 2694, startMonth: "2025-10" },
  { description: "Nintendo switch 2", totalAmount: 10990, numberOfAmounts: 15, mensuality: 733, startMonth: "2025-10" },
  { description: "Amazon", totalAmount: 3150, numberOfAmounts: 3, mensuality: 1050, startMonth: "2025-12" },
  { description: "Toys r us", totalAmount: 2094, numberOfAmounts: 6, mensuality: 349, startMonth: "2026-01" },
  { description: "Moto", totalAmount: 34999, numberOfAmounts: 12, mensuality: 2916.5, startMonth: "2026-02" },
]

export default {
    moves: generateMoves(200),
    recurrentMoves,
    msiMoves,
    salary: 40000
}