"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  DollarSign,
  Plus,
  Calendar,
  TrendingUp,
  TrendingDown,
  Edit,
  Trash2,
  MoreHorizontal,
  User,
  LogOut,
  Settings,
  BarChart3,
  PieChart,
  Filter,
  Download,
  Search,
} from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import * as XLSX from "xlsx" // Import xlsx library for Excel export

import { DailyChart } from "@/components/daily-chart"
import { MonthlyChart } from "@/components/monthly-chart"
import { YearlyChart } from "@/components/yearly-chart"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("daily")
  const [expenses, setExpenses] = useState([]) // State for the recent expenses list
  const [summaryData, setSummaryData] = useState({
    totalExpenses: 0,
    todayTotal: 0,
    yesterdayTotal: 0,
    totalTransactions: 0,
    loading: true,
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPeriodDetails, setSelectedPeriodDetails] = useState(null) // { title: string, expenses: array }
  const [userData, setUserData] = useState({ name: "Loading...", email: "loading@example.com" }) // State for user profile
  const [dynamicCategories, setDynamicCategories] = useState([]) // New state for dynamic categories

  // Form states for Add/Edit Expense
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  })

  // Fetch user data for profile dropdown
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Mock user data fetch - replace with your actual API endpoint
        const response = await fetch("http://localhost:3000/person/user", {
          credentials: "include",
        })
        if (response.ok) {
          const result = await response.json()
          setUserData(result.user)
        } else {
          console.error("Failed to fetch user data")
          setUserData({ name: "Guest User", email: "guest@example.com" })
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
        setUserData({ name: "Guest User", email: "guest@example.com" })
      }
    }
    fetchUserData()
  }, [])

  // Fetch summary data for cards (last 7 days)
  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const response = await fetch("http://localhost:3000/expense/days", {
          credentials: "include",
        })

        if (response.ok) {
          const result = await response.json()
          const data = result.data

          const totalExpenses = data.reduce((sum, item) => sum + item.total, 0)
          const todayData = data[data.length - 1] || { total: 0 }
          const yesterdayData = data[data.length - 2] || { total: 0 }
          const totalTransactions = data.reduce((sum, item) => sum + item.expenses.length, 0)

          setSummaryData({
            totalExpenses,
            todayTotal: todayData.total,
            yesterdayTotal: yesterdayData.total,
            totalTransactions,
            loading: false,
          })
        }
      } catch (error) {
        console.error("Failed to fetch summary data:", error)
        setSummaryData((prev) => ({ ...prev, loading: false }))
      }
    }

    fetchSummaryData()
  }, [])

  // Fetch initial expenses for the Recent Expenses list and Category Breakdown
  useEffect(() => {
    const fetchRecentExpenses = async () => {
      try {
        const response = await fetch("http://localhost:3000/expense/days", {
          credentials: "include",
        })
        if (response.ok) {
          const result = await response.json()
          const allRecentExpenses = result.data.flatMap((day) => day.expenses)
          // Sort expenses from most recent date to oldest
          const sortedExpenses = allRecentExpenses.sort((a, b) => new Date(b.date) - new Date(a.date))
          setExpenses(sortedExpenses)

          // Extract unique categories from fetched expenses
          const uniqueCategories = [...new Set(allRecentExpenses.map((expense) => expense.category))].sort()
          setDynamicCategories(uniqueCategories)
        }
      } catch (error) {
        console.error("Failed to fetch recent expenses:", error)
      }
    }
    fetchRecentExpenses()
  }, [])

  // Calculate category breakdown from fetched expenses
  const calculateCategoryBreakdown = () => {
    const categoryMap = new Map()
    let totalOverallSpending = 0

    expenses.forEach((expense) => {
      const currentTotal = categoryMap.get(expense.category) || 0
      categoryMap.set(expense.category, currentTotal + expense.amount)
      totalOverallSpending += expense.amount
    })

    const breakdown = Array.from(categoryMap.entries()).map(([category, total]) => ({
      category,
      total,
      percentage: totalOverallSpending > 0 ? (total / totalOverallSpending) * 100 : 0,
    }))

    // Sort by total descending for "Top Categories"
    return breakdown.sort((a, b) => b.total - a.total)
  }

  const topCategories = calculateCategoryBreakdown()

  // Handle form changes
  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Add expense
  const handleAddExpense = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3000/expense/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number.parseFloat(formData.amount),
          category: formData.category,
          description: formData.description,
          date: formData.date,
        }),
        credentials: "include",
      })
      const responseData = await response.json()
      if (response.ok) {
        toast.success(responseData.message)
        // Add new expense to the beginning of the list and re-sort
        const updatedExpenses = [...expenses, responseData.expense].sort((a, b) => new Date(b.date) - new Date(a.date))
        setExpenses(updatedExpenses)
        // Update dynamic categories
        const uniqueCategories = [...new Set(updatedExpenses.map((expense) => expense.category))].sort()
        setDynamicCategories(uniqueCategories)

        setFormData({
          amount: "",
          category: "",
          description: "",
          date: new Date().toISOString().split("T")[0],
        })
        setIsAddDialogOpen(false)
      } else {
        toast.error(responseData.error || "Failed to add expense")
      }
    } catch (error) {
      toast.error("Something went wrong")
      console.error(error)
    }
  }

  // Edit expense
  const handleEditExpense = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3000/expense/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: editingExpense._id,
          amount: Number.parseFloat(formData.amount),
          category: formData.category,
          description: formData.description,
          date: formData.date,
        }),
        credentials: "include",
      })
      const responseData = await response.json()
      if (response.ok) {
        toast.success(responseData.message)
        // Update and re-sort the expenses list
        const updatedExpenses = expenses
          .map((expense) =>
            expense._id === editingExpense._id
              ? { ...expense, ...formData, amount: Number.parseFloat(formData.amount) }
              : expense,
          )
          .sort((a, b) => new Date(b.date) - new Date(a.date))
        setExpenses(updatedExpenses)
        // Update dynamic categories
        const uniqueCategories = [...new Set(updatedExpenses.map((expense) => expense.category))].sort()
        setDynamicCategories(uniqueCategories)

        setIsEditDialogOpen(false)
        setEditingExpense(null)
      } else {
        toast.error(responseData.error || "Failed to update expense")
      }
    } catch (error) {
      toast.error("Something went wrong")
      console.error(error)
    }
  }

  // Delete expense
  const handleDeleteExpense = async (expenseId) => {
    try {
      const response = await fetch("http://localhost:3000/expense/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: expenseId }),
        credentials: "include",
      })
      const responseData = await response.json()
      if (response.ok) {
        toast.success(responseData.message)
        const updatedExpenses = expenses.filter((expense) => expense._id !== expenseId)
        setExpenses(updatedExpenses)
        // Update dynamic categories
        const uniqueCategories = [...new Set(updatedExpenses.map((expense) => expense.category))].sort()
        setDynamicCategories(uniqueCategories)
      } else {
        toast.error(responseData.error || "Failed to delete expense")
      }
    } catch (error) {
      toast.error("Something went wrong")
      console.error(error)
    }
  }

  // Open edit dialog
  const openEditDialog = (expense) => {
    setEditingExpense(expense)
    setFormData({
      amount: expense.amount.toString(),
      category: expense.category,
      description: expense.description,
      date: expense.date,
    })
    setIsEditDialogOpen(true)
  }

  // Filter expenses for the Recent Expenses list
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || expense.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Callback for chart bar clicks
  const handleChartBarClick = (title, expenses) => {
    setSelectedPeriodDetails({ title, expenses })
  }

  // Handle export to Excel
  const handleExport = async (period) => {
    try {
      let endpoint = ""
      let filename = ""
      let sheetName = ""

      if (period === "daily") {
        endpoint = "http://localhost:3000/expense/days"
        filename = "daily_expenses.xlsx"
        sheetName = "Daily Expenses"
      } else if (period === "monthly") {
        endpoint = "http://localhost:3000/expense/months"
        filename = "monthly_expenses.xlsx"
        sheetName = "Monthly Expenses"
      } else if (period === "yearly") {
        endpoint = "http://localhost:3000/expense/years"
        filename = "yearly_expenses.xlsx"
        sheetName = "Yearly Expenses"
      } else {
        toast.error("Invalid export period selected.")
        return
      }

      toast.info(`Fetching ${period} expenses for export...`)
      const response = await fetch(endpoint, { credentials: "include" })

      if (!response.ok) {
        throw new Error(`Failed to fetch ${period} expenses for export`)
      }

      const result = await response.json()
      const dataToExport = result.data

      // Flatten the data for Excel
      const flattenedData = []
      if (period === "daily" || period === "monthly" || period === "yearly") {
        dataToExport.forEach((periodData) => {
          periodData.expenses.forEach((expense) => {
            flattenedData.push({
              Date: new Date(expense.date).toLocaleDateString(),
              Amount: expense.amount,
              Category: expense.category,
              Description: expense.description,
              Period: periodData.date || periodData.month || periodData.year, // Use appropriate period key
            })
          })
        })
      }

      if (flattenedData.length === 0) {
        toast.warn(`No expenses found for ${period} to export.`)
        return
      }

      const ws = XLSX.utils.json_to_sheet(flattenedData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, sheetName)
      XLSX.writeFile(wb, filename)
      toast.success(`Successfully exported ${period} expenses to ${filename}!`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred during export.")
      console.error("Export error:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ExpenseTracker</span>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Dashboard
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Export Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleExport("daily")}>Daily Expenses</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("monthly")}>Monthly Expenses</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("yearly")}>Yearly Expenses</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userData.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userData.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {summaryData.loading ? "Loading..." : `$${summaryData.totalExpenses.toFixed(2)}`}
              </div>
              <p className="text-xs text-muted-foreground">Last 7 days total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Spending</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {summaryData.loading ? "Loading..." : `$${summaryData.todayTotal.toFixed(2)}`}
              </div>
              <p className="text-xs text-muted-foreground">
                {!summaryData.loading && summaryData.yesterdayTotal > 0 ? (
                  summaryData.todayTotal > summaryData.yesterdayTotal ? (
                    <span className="text-red-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />+
                      {(
                        ((summaryData.todayTotal - summaryData.yesterdayTotal) / summaryData.yesterdayTotal) *
                        100
                      ).toFixed(1)}
                      % from yesterday
                    </span>
                  ) : (
                    <span className="text-green-600 flex items-center">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      {(
                        ((summaryData.todayTotal - summaryData.yesterdayTotal) / summaryData.yesterdayTotal) *
                        100
                      ).toFixed(1)}
                      % from yesterday
                    </span>
                  )
                ) : (
                  "No comparison data"
                )}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {summaryData.loading ? "Loading..." : summaryData.totalTransactions}
              </div>
              <p className="text-xs text-muted-foreground">This period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Daily</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {summaryData.loading ? "Loading..." : `$${(summaryData.totalExpenses / 7).toFixed(2)}`}
              </div>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Charts and Quick Actions */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Chart Section */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Expense Overview</CardTitle>
                    <CardDescription>Your spending patterns over time</CardDescription>
                  </div>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                      <TabsTrigger value="daily">Daily</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      <TabsTrigger value="yearly">Yearly</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsContent value="daily">
                    <DailyChart onBarClick={handleChartBarClick} />
                  </TabsContent>
                  <TabsContent value="monthly">
                    <MonthlyChart onBarClick={handleChartBarClick} />
                  </TabsContent>
                  <TabsContent value="yearly">
                    <YearlyChart onBarClick={handleChartBarClick} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your expenses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Expense
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Expense</DialogTitle>
                      <DialogDescription>Enter the details of your new expense.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddExpense}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="amount" className="text-right">
                            Amount
                          </Label>
                          <Input
                            id="amount"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="col-span-3"
                            value={formData.amount}
                            onChange={(e) => handleFormChange("amount", e.target.value)}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="category" className="text-right">
                            Category
                          </Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) => handleFormChange("category", value)}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {dynamicCategories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="date" className="text-right">
                            Date
                          </Label>
                          <Input
                            id="date"
                            type="date"
                            className="col-span-3"
                            value={formData.date}
                            onChange={(e) => handleFormChange("date", e.target.value)}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right">
                            Description
                          </Label>
                          <Textarea
                            id="description"
                            placeholder="Optional description"
                            className="col-span-3"
                            value={formData.description}
                            onChange={(e) => handleFormChange("description", e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Add Expense</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="w-full bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter Expenses
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Top Categories</CardTitle>
                <CardDescription>
                  Your spending by category (last 7 days). Aim for lower spending in these areas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCategories.length > 0 ? (
                    topCategories.slice(0, 5).map((cat, index) => (
                      <div key={cat.category} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-600 mr-3"></div>
                        <div className="flex-1">
                          <div className="flex justify-between text-sm">
                            <span>{cat.category}</span>
                            <span>${cat.total.toFixed(2)}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${cat.percentage}%` }}></div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground">No category data available.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Expense Details Section (appears below charts when a bar is clicked) */}
        {selectedPeriodDetails && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{selectedPeriodDetails.title}</CardTitle>
              <CardDescription>
                {selectedPeriodDetails.expenses.length > 0
                  ? "Detailed expenses for the selected period."
                  : "No expenses recorded for this period."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedPeriodDetails.expenses.length > 0 ? (
                  selectedPeriodDetails.expenses.map((expense) => (
                    <div
                      key={expense._id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{expense.description || "No description"}</div>
                          <div className="text-sm text-gray-500 flex items-center space-x-2">
                            <Badge variant="secondary" className="text-xs">
                              {expense.category}
                            </Badge>
                            <span>{new Date(expense.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <div className="font-semibold">${expense.amount.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">No expenses to display for this period.</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Expenses List */}
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Expenses</CardTitle>
                <CardDescription>Manage your expense transactions</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search expenses..."
                    className="pl-8 w-[200px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {dynamicCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredExpenses.map((expense) => (
                <div
                  key={expense._id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">{expense.description || "No description"}</div>
                      <div className="text-sm text-gray-500 flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          {expense.category}
                        </Badge>
                        <span>{new Date(expense.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="font-semibold">${expense.amount.toFixed(2)}</div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(expense)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this expense.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteExpense(expense._id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
            <DialogDescription>Update the details of your expense.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditExpense}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="edit-amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="col-span-3"
                  value={formData.amount}
                  onChange={(e) => handleFormChange("amount", e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">
                  Category
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleFormChange("category", value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {dynamicCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-date" className="text-right">
                  Date
                </Label>
                <Input
                  id="edit-date"
                  type="date"
                  className="col-span-3"
                  value={formData.date}
                  onChange={(e) => handleFormChange("date", e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  placeholder="Optional description"
                  className="col-span-3"
                  value={formData.description}
                  onChange={(e) => handleFormChange("description", e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Update Expense</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}
