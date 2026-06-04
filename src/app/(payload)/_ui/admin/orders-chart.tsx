"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface WeekData {
  week: string
  total: number
  count: number
}

interface Props {
  data: WeekData[]
}

export function OrdersChart({ data }: Props) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 50, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="week" tick={{ fontSize: 11 }} />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 11 }}
            tickFormatter={(v) => `${v}€`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 11 }}
            tickFormatter={(v) => `${v}`}
            allowDecimals={false}
          />
          <Tooltip
            formatter={(value: number, name: string) =>
              name === "total" ? [`${value.toFixed(2)}€`, "CA"] : [value, "Commandes"]
            }
          />
          <Legend formatter={(value) => (value === "total" ? "CA (€)" : "Nb commandes")} />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="total"
            stroke="#2563eb"
            strokeWidth={2}
            fill="url(#colorTotal)"
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="count"
            stroke="#16a34a"
            strokeWidth={2}
            fill="url(#colorCount)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
