import {faker} from '@faker-js/faker'

type MoveType = "single" | "recurrent" | "msi"
type YearMonth = `${number}-${"01"|"02"|"03"|"04"|"05"|"06"|"07"|"08"|"09"|"10"|"11"|"12"}`


interface BaseMove {
  description: string
}


export interface SingleMove extends BaseMove {
  type: "single"
  amount: number
  date: Date
}

export interface RecurrentMove extends BaseMove {
  type: "recurrent"
  monthlyAmount: number
}

export interface MsiMove extends BaseMove {
  type: "msi"
  totalAmount: number
  months: number
  monthlyAmount: number
  startMonth: YearMonth
}

export type Move =
  | SingleMove
  | RecurrentMove
  | MsiMove

const generateMoves = (quantity: number): SingleMove[] => Array(quantity).fill(null).map(
    () => ({
        type: "single",
        description: faker.lorem.sentence({ min: 4, max: 8}),
        amount: parseInt(faker.finance.amount({min: 100, max: 1500})),
        date: faker.date.recent({days: 240})
    })
)


const recurrentMoves: RecurrentMove[] = [
  { type: "recurrent", description: "Cursos ingles INBI", monthlyAmount: 2250 },
  { type: "recurrent", description: "Tanda", monthlyAmount: 600 },
  { type: "recurrent", description: "Natacion", monthlyAmount: 2208 },
  { type: "recurrent", description: "Crossfit", monthlyAmount: 2500 }
]

const msiMoves: MsiMove[] = [
  { type: "msi", description: "Iphone 16", totalAmount: 23999, months: 12, monthlyAmount: 2000, startMonth: "2025-03" },
  { type: "msi", description: "Vivaerobus", totalAmount: 5842.96, months: 12, monthlyAmount: 487, startMonth: "2025-09" },
  { type: "msi", description: "Dentalia", totalAmount: 20399, months: 12, monthlyAmount: 1700, startMonth: "2025-10" },
  { type: "msi", description: "Tenis Skechers Valeria", totalAmount: 2399, months: 3, monthlyAmount: 799, startMonth: "2025-10" },
  { type: "msi", description: "Suburbia san jeronimo", totalAmount: 4162, months: 6, monthlyAmount: 694, startMonth: "2025-10" },
  { type: "msi", description: "Roberts perisur", totalAmount: 8082, months: 3, monthlyAmount: 2694, startMonth: "2025-10" },
  { type: "msi", description: "Nintendo switch 2", totalAmount: 10990, months: 15, monthlyAmount: 733, startMonth: "2025-10" },
  { type: "msi", description: "Amazon", totalAmount: 3150, months: 3, monthlyAmount: 1050, startMonth: "2025-12" },
  { type: "msi", description: "Toys r us", totalAmount: 2094, months: 6, monthlyAmount: 349, startMonth: "2026-01" },
  { type: "msi", description: "Moto", totalAmount: 34999, months: 12, monthlyAmount: 2916.5, startMonth: "2026-02" },
]

export default {
    moves: generateMoves(200),
    recurrentMoves,
    msiMoves,
    salary: 40000
}