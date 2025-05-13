import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import UnizikLogo from "../assets/Images/unizik-logo.png"
import UnizikLogo2 from "../assets/Images/logo.png"

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle login logic here
        console.log("Login attempt with:", { email, password })
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <header className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <img
                            src={UnizikLogo}
                            alt="University Alumni Logo"
                            className="h-12"
                        />
                    </div>
                    <button className="flex items-center gap-2 text-gray-600 bg-gray-100 px-3 py-2 rounded-md text-sm">
                        Contact Support
                    </button>
                </header>
            </div>
            <hr className="w-full border-t border-gray-200" />

            <div className="max-w-7xl mx-auto px-4">
                <main className="flex justify-center items-center py-12">
                    <div className="w-full max-w-md bg-white border border-gray-100 rounded-lg shadow-sm p-8">
                        <div className="flex justify-center mb-6">
                            <img
                                src={UnizikLogo2}
                                alt="University Emblem"
                                className="h-20"
                            />
                        </div>

                        <h1 className="text-2xl font-bold text-center mb-6">Login to Admin Portal</h1>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="user@example.com"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="password" className="block text-sm mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
                            >
                                Login
                            </button>
                        </form>

                        <div className="mt-4 text-center text-sm">
                            <span className="text-gray-600">Forgot Password?</span>{" "}
                            <a href="/" className="text-blue-600 hover:underline">
                                Request access
                            </a>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Login
