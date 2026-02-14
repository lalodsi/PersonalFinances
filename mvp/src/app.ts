import { Chart, CategoryScale, LineController, LineElement, LinearScale, PointElement, type ChartItem } from "chart.js"

import { Canvas } from "skia-canvas"
import fsp from 'node:fs/promises';

import type { RecurrentMove } from './data.js'
import data from './data.js'
import { monthKey, monthlyObligations, monthsRange, msiMonthlySchedule} from './calendar-utils.js'
import type { DebtCalendar } from './calendar-utils.js'

Chart.register([
    LineController,
    PointElement,
    LinearScale,
    CategoryScale,
    LineElement,
])



/* -----------------------
   Función principal: genera reporte y grafica
   ----------------------- */
async function run({
  monthsToShow = 12,
  savingsGoalMonthly = 0 // si quieres ahorrar X cada mes, ponlo aquí; o 0
} = {}) {
  const timeline = monthsRange(new Date(2025, 0), monthsToShow)
  console.log("timeline: ", timeline)
  const labels = timeline.labels
  const keys = timeline.keys

  const timelineStartKey = keys[0]

  // desglose MSI por mes
  const msiSchedule = msiMonthlySchedule(data.msiMoves, keys, timelineStartKey!)
  console.log('msi; ', msiSchedule)

  // obligaciones
  const obligations = monthlyObligations(data.recurrentMoves, msiSchedule, keys)

  // sumas globales
  const totalRecurrent = data.recurrentMoves.reduce((a,b) => a + Number(b.monthlyAmount), 0)
  const totalMsiMensual = data.msiMoves.reduce((a,b) => a + Number(b.monthlyAmount), 0)

  // armar datasets para gráfica
  const salaryArray = keys.map(_ => data.salary)
  const obligationsArray = keys.map(k => obligations[k]!.total + savingsGoalMonthly)
  const recurrentArray = keys.map(k => obligations[k]!.recurrent)
  const msiArray = keys.map(k => obligations[k]!.msi)

  // crear canvas y chart (igual que tu idea original)
//   const canvas = new Canvas(800, 400)
  const canvas = new Canvas(900, 500);
  const ctx = canvas.getContext('2d') as unknown as ChartItem

  const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels, // ← siguen siendo tus labels reales ej: "2025-01"
    datasets: [
      {
        label: 'Salary',
        data: salaryArray,
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.25
      },
      {
        label: 'Total obligations (+ savings)',
        data: obligationsArray,
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.25
      },
      {
        label: 'Recurrent',
        data: recurrentArray,
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.25
      },
      {
        label: 'MSI monthly',
        data: msiArray,
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.25
      }
    ]
  },
  options: {
    responsive: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 14 }
        }
      },
      title: {
        display: true,
        text: 'Salary vs Obligations Timeline',
        font: { size: 20 },
        padding: { top: 10, bottom: 20 }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month'
        },
        ticks: {
          maxRotation: 60,
          minRotation: 45,
          autoSkip: false,        // ← muestra TODOS los meses
          font: { size: 12 }
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (MXN)'
        },
        ticks: {
          font: { size: 12 }
        }
      }
    }
  }
})


  const pngBuffer = await canvas.toBuffer('png', { matte: 'white' })
  await fsp.writeFile('./generated/obligations_vs_salary.png', pngBuffer)
  chart.destroy()

  // imprimir reporte tabular simple
  console.log('--- RESUMEN ---')
  console.log(`Salary mensual: ${data.salary}`)
  console.log(`Suma mensual recurrentes: ${totalRecurrent}`)
  console.log(`Suma mensual MSI (si se activaran todos los actuales cada mes): ${totalMsiMensual}`)
  console.log(`Meta de ahorro mensual (si aplica): ${savingsGoalMonthly}`)
  console.log('')

  console.log('Desglose por mes:')
  for (const k of keys) {
    const o = obligations[k]!
    const available = data.salary - o.total - savingsGoalMonthly
    console.log(`${k} | recurrent: ${o.recurrent} | msi: ${o.msi} | total: ${o.total} | disponible para gastar: ${available}`)
  }

  // mostrar por-item MSI cuánto queda por pagar (resumen)
  console.log('\nMSI detalle (resumen de cuotas originales):')
  for (const m of data.msiMoves) {
    console.log(`${m.description} — mensualidad: ${m.monthlyAmount} — cuotas totales: ${m.months} — total: ${m.totalAmount} — startMonth: ${m.startMonth || 'assumed this month'}`)
  }

  // exportar CSV simple del timeline (opcional)
  const csvRows = [
    ['month', 'recurrent', 'msi', 'total', 'available'].join(',')
  ]
  for (const k of keys) {
    const o = obligations[k]!
    const available = data.salary - o.total - savingsGoalMonthly
    csvRows.push([k, o.recurrent, o.msi, o.total, available].join(','))
  }
  await fsp.writeFile('./generated/timeline_report.csv', csvRows.join('\n'))
  console.log('\nArchivos generados: obligations_vs_salary.png , timeline_report.csv')
}

await run({ monthsToShow: 24, savingsGoalMonthly: 4000 })
