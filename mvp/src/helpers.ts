
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