
"use client"

import { useState } from "react"
import { NavLink } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Lock, ArrowRight, CheckCircle, Shield, Zap, BarChart3, DollarSign } from "lucide-react"

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  const changeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData({
      ...data,
      [name]: value,
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()

    // Basic validation
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (!acceptTerms) {
      toast.error("Please accept the terms and conditions")
      return
    }

    setIsLoading(true)

    const registerUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/person/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
          }),
          credentials: "include",
        })

        const responseData = await response.json()
        console.log(responseData)

        if (responseData.error) {
          toast.error(responseData.error)
        } else {
          toast.success("Account created successfully!")
        }

        if (responseData.redirect) {
          window.location.href = responseData.redirect
        }
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    registerUser()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 px-4 lg:px-6 h-16 flex items-center bg-white/80 backdrop-blur-sm border-b">
        <NavLink to="/" className="flex items-center justify-center">
          <DollarSign className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">ExpenseTracker</span>
        </NavLink>
        <nav className="ml-auto">
          <NavLink to="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
            ← Back to Home
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto mt-16">
        <Card className="overflow-hidden border-0 shadow-2xl py-0">
          <div className="grid lg:grid-cols-2 min-h-[700px] ">
            {/* Left Side - Form */}
            <div className="flex items-center justify-center p-8 lg:p-12">
              <div className="w-full max-w-md space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900">Create Account</CardTitle>
                  <CardDescription className="text-gray-600">
                    Join thousands of users tracking their expenses automatically
                  </CardDescription>
                </div>

                {/* Form */}
                <form onSubmit={submitHandler} className="space-y-6">
                  <div className="space-y-4">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your full name"
                          className="pl-10"
                          onChange={changeHandler}
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10"
                          onChange={changeHandler}
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Create a password"
                          className="pl-10"
                          onChange={changeHandler}
                          required
                        />
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          className="pl-10"
                          onChange={changeHandler}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700">Password must contain:</p>
                    <div className="grid grid-cols-1 gap-1 text-xs text-gray-600">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>At least 8 characters</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>One uppercase letter</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>One number or special character</span>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" checked={acceptTerms} onCheckedChange={setAcceptTerms} />
                    <Label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-500 underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-500 underline">
                        Privacy Policy
                      </a>
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating Account...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        Create Account
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    )}
                  </Button>
                </form>

                {/* Sign In Link */}
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <NavLink to="/Login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                      Sign in here
                    </NavLink>
                  </p>
                </div>

                {/* Social Registration */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full bg-transparent">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
                    </Button>

                    <Button variant="outline" className="w-full bg-transparent">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                      Twitter
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Features/Benefits */}
            <div className="hidden lg:block relative bg-gradient-to-br from-blue-600 to-purple-600">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative h-full flex items-center justify-center p-12">
                <div className="text-center text-white space-y-8">
                  <div className="space-y-4">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      <Zap className="w-3 h-3 mr-1" />
                      Get Started Today
                    </Badge>
                    <h3 className="text-3xl font-bold">Join the Future of Expense Tracking</h3>
                    <p className="text-blue-100 text-lg leading-relaxed">
                      Start your journey towards better financial management with our intelligent expense tracking
                      system.
                    </p>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 text-left">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                        <Zap className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Automatic Capture</h4>
                        <p className="text-blue-100 text-sm">
                          Messages are automatically processed and expenses extracted
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 text-left">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                        <BarChart3 className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Smart Analytics</h4>
                        <p className="text-blue-100 text-sm">
                          Beautiful charts and insights for daily, monthly, yearly tracking
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 text-left">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                        <Shield className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Secure & Private</h4>
                        <p className="text-blue-100 text-sm">Your financial data is encrypted and completely secure</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold">10K+</div>
                      <div className="text-blue-100 text-xs">Active Users</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">1M+</div>
                      <div className="text-blue-100 text-xs">Expenses Tracked</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">99.9%</div>
                      <div className="text-blue-100 text-xs">Accuracy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
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
