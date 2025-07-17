
"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function MonthlyChart({ onBarClick }) {
  // Receive onBarClick prop
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:3000/expense/months", {
          credentials: "include",
        })

        if (!response.ok) {
          throw new Error("Failed to fetch monthly expenses")
        }

        const result = await response.json()

        const chartData = result.data.map((item) => ({
          ...item,
          displayMonth: new Date(item.month + "-01").toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          }),
        }))

        setData(chartData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleBarClick = (dataPoint) => {
    if (onBarClick) {
      onBarClick(`Expenses for ${dataPoint.displayMonth}`, dataPoint.expenses)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  const totalExpenses = data.reduce((sum, item) => sum + item.total, 0)
  const averageMonthly = totalExpenses / data.length

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Total (12 months)</p>
          <p className="text-2xl font-bold">{totalExpenses.toFixed(2)} Rs</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Monthly Average</p>
          <p className="text-2xl font-bold">{averageMonthly.toFixed(2)} Rs</p>
        </div>
      </div>

      <ChartContainer
        config={{
          total: {
            label: "Monthly Expenses",
            color: "hsl(var(--chart-2))",
          },
        }}
        className="h-[300px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="displayMonth" tickLine={false} axisLine={false} className="text-xs" />
            <YAxis tickLine={false} axisLine={false} className="text-xs" tickFormatter={(value) => `${value} Rs`} />
            <ChartTooltip content={<ChartTooltipContent />} formatter={(value) => [`${value} Rs `, "Monthly Expenses"]} />
            <Bar
              dataKey="total"
              fill="var(--color-total)"
              radius={[4, 4, 0, 0]}
              onClick={handleBarClick}
              cursor="pointer"
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
