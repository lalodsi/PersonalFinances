import type { MsiMove, RecurrentMove, SingleMove } from "./data.js"

export type DebtCalendar = Record<string, MsiMove[]>

/**
 * Returns a short month label (e.g., "Jan 2025").
 * @param year Full year (e.g., 2025)
 * @param month Zero-based month index (0 = January, 11 = December)
 */
export const formatMonthLabel = (year: number, month: number): string => {
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${MONTHS[month]} ${year}`
}

/**
 * Returns a new Date shifted by a given number of months.
 */
export function addMonths(date: Date, count: number): Date {
  const d = new Date(date)
  d.setMonth(d.getMonth() + count)
  return d
}

/**
 * Returns a YYYY-MM key for a given date.
 */
export function monthKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

/**
 * Generates a range of consecutive months.
 *
 * @param startDate Starting date (defaults to current date)
 * @param count Number of months to generate
 * @returns Object containing:
 *  - labels: ["Jan 2025", "Feb 2025", ...]
 *  - keys: ["2025-01", "2025-02", ...]
 */
export function monthsRange(startDate = new Date(), count = 12) {
  const labels: string[] = []
  const keys: string[] = []

  for (let i = 0; i < count; i++) {
    const d = addMonths(startDate, i)
    labels.push(formatMonthLabel(d.getFullYear(), d.getMonth()))
    keys.push(monthKey(d))
  }

  return { labels, keys }
}

/* =====================================================
   Move Grouping
   ===================================================== */

/**
 * Groups single moves by calendar month (YYYY-MM).
 */
export function groupMovesByMonth(moves: SingleMove[]) {
  const result: Record<string, SingleMove[]> = {}

  for (const move of moves) {
    const key = monthKey(new Date(move.date))
    if (!result[key]) result[key] = []
    result[key].push(move)
  }

  return result
}

/* =====================================================
   MSI Schedule Projection
   ===================================================== */

/**
 * Builds an MSI projection over a given timeline.
 *
 * For each timeline month, determines which MSI items
 * are still active and assigns them to that month.
 *
 * @param msiMoves List of MSI moves
 * @param timelineKeys Array of YYYY-MM keys to evaluate
 * @param timelineStartKey First month in timeline (YYYY-MM)
 *
 * @returns Map of monthKey -> active MSI moves for that month
 */
export const msiMonthlySchedule = (
  msiMoves: MsiMove[],
  timelineKeys: string[],
  timelineStartKey: string
): DebtCalendar => {

  const schedule: DebtCalendar = Object.fromEntries(
    timelineKeys.map(k => [k, []])
  )

  const [startYear, startMonth] = timelineStartKey.split('-').map(Number)
  const timelineStart = new Date(startYear!, startMonth! - 1, 1)

  for (const item of msiMoves) {
    const startKey = item.startMonth || monthKey(new Date())
    const [sy, sm] = startKey.split('-').map(Number)
    const itemStartDate = new Date(sy!, sm! - 1, 1)

    const monthsDiff =
      (timelineStart.getFullYear() - itemStartDate.getFullYear()) * 12 +
      (timelineStart.getMonth() - itemStartDate.getMonth())

    let startIndex = monthsDiff

    for (let i = 0; i < timelineKeys.length; i++) {
      const installmentIndex = i + startIndex

      if (installmentIndex >= 0 && installmentIndex < item.months) {
        schedule[timelineKeys[i]!]!.push(item)
      }
    }
  }

  return schedule
}


/* =====================================================
   Monthly Obligations Calculation
   ===================================================== */

/**
 * Calculates total monthly obligations by combining:
 *  - Fixed recurrent payments
 *  - Active MSI payments
 *
 * @param recurrentMoves Fixed monthly payments
 * @param msiSchedule MSI projection by month
 * @param timelineKeys Months to evaluate
 *
 * @returns Map of monthKey -> { recurrent, msi, total }
 */
export const monthlyObligations = (
  recurrentMoves: RecurrentMove[],
  msiSchedule: DebtCalendar,
  timelineKeys: string[]
) => {

  const recurrentTotal = recurrentMoves.reduce(
    (acc, r) => acc + Number(r.monthlyAmount),
    0
  )

  const result: Record<string, {
    recurrent: number
    msi: number
    total: number
  }> = {}

  for (const key of timelineKeys) {
    const monthMsi = msiSchedule[key] || []

    const msiTotal = monthMsi.reduce(
      (acc, curr) => acc + curr.monthlyAmount,
      0
    )

    result[key] = {
      recurrent: recurrentTotal,
      msi: msiTotal,
      total: recurrentTotal + msiTotal
    }
  }

  return result
}