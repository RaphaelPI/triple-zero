import config from "@payload-config"
import { addWeeks, format, parse, setDay } from "date-fns"
import { unstable_cache } from "next/cache"
import { getPayload } from "payload"

import { OrdersChart } from "./orders-chart"

const getOrdersChartData = unstable_cache(
  async () => {
    const payload = await getPayload({ config })

    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const { docs } = await payload.find({
      collection: "order",
      pagination: false,
      where: {
        and: [
          { status: { not_in: ["cancelled"] } },
          { date: { greater_than_equal: sixMonthsAgo.toISOString() } },
        ],
      },
      select: {
        week: true,
        amount: true,
      },
    })

    const weekMap = new Map<string, { total: number; count: number }>()
    for (const order of docs) {
      if (!order.week || order.amount == null) continue
      const entry = weekMap.get(order.week) ?? { total: 0, count: 0 }
      weekMap.set(order.week, { total: entry.total + order.amount, count: entry.count + 1 })
    }

    const currentWeekDate = setDay(new Date(), 6, { weekStartsOn: 1 })
    const currentWeekStr = format(currentWeekDate, "dd/MM/yyyy")

    const sortedEntries = Array.from(weekMap.entries()).sort(([a], [b]) => {
      const dateA = parse(a, "dd/MM/yyyy", new Date())
      const dateB = parse(b, "dd/MM/yyyy", new Date())
      return dateA.getTime() - dateB.getTime()
    })

    const data: { week: string; total: number; count: number }[] = []
    if (sortedEntries.length > 0) {
      const firstDate = parse(sortedEntries[0][0], "dd/MM/yyyy", new Date())
      const endDate = parse(currentWeekStr, "dd/MM/yyyy", new Date())
      let cursor = firstDate
      while (cursor <= endDate) {
        const weekStr = format(cursor, "dd/MM/yyyy")
        const entry = weekMap.get(weekStr)
        data.push({ week: weekStr, total: entry?.total ?? 0, count: entry?.count ?? 0 })
        cursor = addWeeks(cursor, 1)
      }
    }

    return data
  },
  ["dashboard-orders-kpi"],
  { revalidate: 86400 }, // 24h
)

export async function DashboardKPIs() {
  const data = await getOrdersChartData()

  return (
    <div style={{ padding: "1.5rem 0" }}>
      <h2 style={{ marginBottom: "1rem", fontSize: "1.1rem", fontWeight: 600 }}>
        Chiffre d&apos;affaires par semaine de production
      </h2>
      <OrdersChart data={data} />
    </div>
  )
}
