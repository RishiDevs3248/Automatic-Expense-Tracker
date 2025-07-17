"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, TrendingUp, TrendingDown } from "lucide-react"

export function YearlyChart({ onBarClick }) {
  // Receive onBarClick prop
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:3000/expense/years", {
          credentials: "include",
        })

        if (!response.ok) {
          throw new Error("Failed to fetch yearly expenses")
        }

        const result = await response.json()
        setData(result.data)
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
      onBarClick(`Expenses for ${dataPoint.year}`, dataPoint.expenses)
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
  const yearlyAverage = totalExpenses / data.length

  const yearsWithData = data.filter((item) => item.total > 0)
  const trend =
    yearsWithData.length >= 2
      ? yearsWithData[yearsWithData.length - 1].total - yearsWithData[yearsWithData.length - 2].total
      : 0

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Total (7 years)</p>
          <p className="text-2xl font-bold">{totalExpenses.toFixed(2)} Rs</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Yearly Average</p>
          <p className="text-2xl font-bold">{yearlyAverage.toFixed(2)} Rs</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Year-over-Year</p>
          <div className="flex items-center gap-1">
            <p className={`text-2xl font-bold ${trend >= 0 ? "text-red-600" : "text-green-600"}`}>
              ${Math.abs(trend).toFixed(2)}
            </p>
            {trend >= 0 ? (
              <TrendingUp className="h-4 w-4 text-red-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-green-600" />
            )}
          </div>
        </div>
      </div>

      <ChartContainer
        config={{
          total: {
            label: "Yearly Expenses",
            color: "hsl(var(--chart-3))",
          },
        }}
        className="h-[300px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="year" tickLine={false} axisLine={false} className="text-xs" />
            <YAxis tickLine={false} axisLine={false} className="text-xs" tickFormatter={(value) => `${value} Rs`} />
            <ChartTooltip content={<ChartTooltipContent />} formatter={(value) => [`${value} Rs `, "Yearly Expenses"]} />
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
