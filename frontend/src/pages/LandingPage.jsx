import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    ArrowRight,
    BarChart3,
    Calendar,
    Database,
    MessageSquare,
    Smartphone,
    TrendingUp,
    Zap,
    Shield,
    Clock,
    DollarSign,
} from "lucide-react"
import { Link } from "react-router-dom"


export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="flex items-center justify-center">
                    <DollarSign className="h-8 w-8 text-blue-600" />
                    <span className="ml-2 text-xl font-bold text-gray-900">ExpenseTracker</span>
                </div>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
                        Features
                    </Link>
                    <Link href="#how-it-works" className="text-sm font-medium hover:text-blue-600 transition-colors">
                        How it Works
                    </Link>
                    <Link href="#pricing" className="text-sm font-medium hover:text-blue-600 transition-colors">
                        Pricing
                    </Link>
                </nav>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <Badge variant="secondary" className="w-fit">
                                        <Zap className="w-3 h-3 mr-1" />
                                        Automatic Tracking
                                    </Badge>
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        Track Your Expenses Automatically
                                    </h1>
                                    <p className="max-w-[600px] text-gray-600 md:text-xl">
                                        Never miss an expense again. Our intelligent system captures your spending from messages, organizes
                                        everything in a database, and provides beautiful insights with daily, monthly, and yearly reports.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Link to={"/Login"}>
                                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                            Get Started Free
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button variant="outline" size="lg">
                                        Watch Demo
                                    </Button>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Shield className="h-4 w-4" />
                                        Secure & Private
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        Real-time Updates
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-3xl opacity-20"></div>
                                    <Card className="relative bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <BarChart3 className="h-5 w-5 text-blue-600" />
                                                Monthly Overview
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-600">Total Spent</span>
                                                    <span className="font-semibold">2,847.50 Rs</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-3/4"></div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <div className="text-gray-600">Food & Dining</div>
                                                    <div className="font-semibold">847.20 Rs</div>
                                                </div>
                                                <div>
                                                    <div className="text-gray-600">Transportation</div>
                                                    <div className="font-semibold">234.80 Rs</div>
                                                </div>
                                                <div>
                                                    <div className="text-gray-600">Shopping</div>
                                                    <div className="font-semibold">456.30 Rs</div>
                                                </div>
                                                <div>
                                                    <div className="text-gray-600">Utilities</div>
                                                    <div className="font-semibold">189.90 Rs</div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <Badge variant="secondary">Features</Badge>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Everything You Need to Track Expenses
                                </h2>
                                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Our comprehensive expense tracking solution automates the entire process from capture to analysis.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-8">
                            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
                                        <MessageSquare className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <CardTitle>Automatic Message Capture</CardTitle>
                                    <CardDescription>
                                        Our support app automatically captures expense information from your messages and SMS.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-2">
                                        <Database className="h-6 w-6 text-green-600" />
                                    </div>
                                    <CardTitle>Smart Database Integration</CardTitle>
                                    <CardDescription>
                                        All your expenses are automatically organized and stored in a secure, searchable database.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-2">
                                        <BarChart3 className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <CardTitle>Beautiful Analytics</CardTitle>
                                    <CardDescription>
                                        Get detailed insights with daily, monthly, and yearly reports plus interactive bar graphs.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-2">
                                        <Calendar className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <CardTitle>Multi-Period Tracking</CardTitle>
                                    <CardDescription>
                                        View your spending patterns across different time periods with easy-to-understand visualizations.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-2">
                                        <TrendingUp className="h-6 w-6 text-red-600" />
                                    </div>
                                    <CardTitle>Trend Analysis</CardTitle>
                                    <CardDescription>
                                        Identify spending trends and patterns to make better financial decisions.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center mb-2">
                                        <Smartphone className="h-6 w-6 text-teal-600" />
                                    </div>
                                    <CardTitle>Mobile Optimized</CardTitle>
                                    <CardDescription>
                                        Access your expense data anywhere with our fully responsive web interface.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section
                    id="how-it-works"
                    className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50"
                >
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <Badge variant="secondary">How It Works</Badge>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple 3-Step Process</h2>
                                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Get started with automatic expense tracking in minutes.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                            <div className="flex flex-col items-center space-y-4 text-center">
                                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
                                    1
                                </div>
                                <h3 className="text-xl font-bold">Connect Your Messages</h3>
                                <p className="text-gray-600">
                                    Install our support app and connect it to your messaging platforms to start capturing expense data
                                    automatically.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4 text-center">
                                <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white text-xl font-bold">
                                    2
                                </div>
                                <h3 className="text-xl font-bold">Automatic Processing</h3>
                                <p className="text-gray-600">
                                    Our AI processes your messages, extracts expense information, and organizes everything in your
                                    personal database.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4 text-center">
                                <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl font-bold">
                                    3
                                </div>
                                <h3 className="text-xl font-bold">Track & Analyze</h3>
                                <p className="text-gray-600">
                                    View your expenses through beautiful dashboards with daily, monthly, and yearly insights plus
                                    interactive charts.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="grid gap-6 lg:grid-cols-4 lg:gap-12">
                            <div className="flex flex-col items-center space-y-2 text-center">
                                <div className="text-3xl font-bold text-blue-600">99.9%</div>
                                <div className="text-sm text-gray-600">Accuracy Rate</div>
                            </div>
                            <div className="flex flex-col items-center space-y-2 text-center">
                                <div className="text-3xl font-bold text-green-600">10K+</div>
                                <div className="text-sm text-gray-600">Active Users</div>
                            </div>
                            <div className="flex flex-col items-center space-y-2 text-center">
                                <div className="text-3xl font-bold text-purple-600">1M+</div>
                                <div className="text-sm text-gray-600">Expenses Tracked</div>
                            </div>
                            <div className="flex flex-col items-center space-y-2 text-center">
                                <div className="text-3xl font-bold text-orange-600">24/7</div>
                                <div className="text-sm text-gray-600">Automatic Monitoring</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-purple-600">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    Ready to Automate Your Expense Tracking?
                                </h2>
                                <p className="mx-auto max-w-[600px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Join thousands of users who have simplified their financial management with our automatic expense
                                    tracker.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Link to={"/Login"}>
                                    <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                                        Start Free Trial
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-white text-white hover:bg-white/10 bg-transparent"
                                >
                                    Schedule Demo
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
                <p className="text-xs text-gray-500">© 2024 ExpenseTracker. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-500">
                        Terms of Service
                    </Link>
                    <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-500">
                        Privacy Policy
                    </Link>
                    <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-500">
                        Contact
                    </Link>
                </nav>
            </footer>
        </div>
    )
}
