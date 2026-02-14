import type { MsiMove, RecurrentMove, SingleMove } from "./data.js"

export type DebtCalendar = Record<string, MsiMove[]>


export const formatMonthLabel = (year: number, month: number) => {
  // month: 0..11
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${MONTHS[month]} ${year}`
}

export function addMonths(date: Date, count: number) {
  const d = new Date(date)
  d.setMonth(d.getMonth() + count)
  return d
}

export function monthKey(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0') // YYYY-MM
  return `${y}-${m}`
}

/**
 * 
 * @param {Date} startDate initial month
 * @param {number} count number of months to consider in the range
 * @returns {
 *  labels: [ Jan 2025, Feb 2025, March 2025, ... ],
 *  keys: [ 2025-01, 2025-02, 2025-03, ...]
 * }
 */
export function monthsRange(startDate = new Date(), count = 12) {
  const labels = []
  const keys = []
  for (let i = 0; i < count; i++) {
    const d = addMonths(startDate, i)
    labels.push(formatMonthLabel(d.getFullYear(), d.getMonth()))
    keys.push(monthKey(d))
  }
  return { labels, keys }
}

/* -----------------------
   Agrupar gastos por mes (por movimientos aleatorios)
   ----------------------- */
function groupMovesByMonth(moves: SingleMove[]) {
  const out: Record<string, SingleMove[]> = {}
  for (const m of moves) {
    const key = monthKey(new Date(m.date))
    out[key] = out[key] || []
    out[key].push(m)
  }
  return out
}

/* -----------------------
   Desglose MSI
   - Asume que cada msiMove tiene:
     { totalAmount, months, monthlyAmount, startMonth? }
   - startMonth (opcional) = 'YYYY-MM'
   - Si no tiene startMonth se asume que comenzó en el mes actual.
   Returns: map monthKey => total MSI mensual for that month (for the timeline)
   ----------------------- */
export const msiMonthlySchedule = (msiMoves: MsiMove[], timelineKeys: string[], timelineStartKey: string) => {
  // timelineKeys: array de 'YYYY-MM' que queremos cubrir (p.ej. próximos 12 meses)
  const schedule: DebtCalendar = Object.fromEntries(timelineKeys.map(k => [k, []]))

  const [y, m]: number[] = timelineStartKey.split('-').map(Number)

  const timelineStart = new Date(y!, m! - 1, 1)

  // calcular start y meses restantes
  for (const item of msiMoves) {
    let startKey = item.startMonth || monthKey(new Date())
    const [sy, sm] = startKey.split('-').map(Number)
    const startDate = new Date(sy!, sm! - 1, 1)

    // meses transcurridos desde inicio hasta timelineStart
    const monthsDiff = (timelineStart.getFullYear() - startDate.getFullYear()) * 12 + (timelineStart.getMonth() - startDate.getMonth())
    let remaining = item.months
    let startIndex = 0
    if (monthsDiff > 0) {
      // ya comenzó anteriormente, entonces quedan:
      remaining = Math.max(0, item.months - monthsDiff)
      startIndex = monthsDiff // el índice relativo en timeline donde aún aplica (si es negativo, se ajusta)
    } else {
      // todavía no comienza (startDate es en futuro) -> startIndex será negativo, convertimos a 0 y el pago empezará en startIndex positivo dentro del timeline
      startIndex = monthsDiff
    }

    // now iterate timelineKeys and add monthlyAmount to months where the installment is still active
    console.log('iterating months')
    for (let i = 0; i < timelineKeys.length; i++) {
      const timelineKey = timelineKeys[i] as string
      console.log(timelineKey)

      // índice relativo de la cuota en timeline: i - startIndex
      const installmentIndex = i + startIndex
      console.log(installmentIndex)
      if (installmentIndex >= 0 && installmentIndex < item.months) {
        schedule[timelineKey]!.push(item)
      }
    }
  }

  return schedule
}

/* -----------------------
   Calcular obligaciones mensuales:
   recurrentes (fijas) + msi
   ----------------------- */
export const monthlyObligations = (recurrentMoves: RecurrentMove[], msiSchedule: DebtCalendar, timelineKeys: string[]) => {
  const recurrentTotal = recurrentMoves.reduce((acc, r) => acc + Number(r.monthlyAmount), 0)
  const out: Record<string, {recurrent: number, msi: number, total: number}> = {}
  for (const key of timelineKeys) {

    const month = msiSchedule[key]!
    const monthSum = month.reduce((acc, curr) => acc + curr.monthlyAmount, 0)
    out[key] = {
      recurrent: recurrentTotal,
      msi: Number(monthSum || 0),
      total: recurrentTotal + Number(monthSum || 0)
    }
    console.log(out[key])
    console.log(msiSchedule[key])
  }
  return out
}