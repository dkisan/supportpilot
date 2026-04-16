"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSignup = async () => {
        try {
            setLoading(true);
            setError("");

            if (!name.trim()) {
                setError("Name is required");
                return;
            }

            if (!email.trim()) {
                setError("Email is required");
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setError("Please enter a valid email address");
                return;
            }

            if (!password) {
                setError("Password is required");
                return;
            }

            if (password.length < 6) {
                setError("Password must be at least 6 characters long");
                return;
            }

            if (!confirmPassword) {
                setError("Please confirm your password");
                return;
            }

            if (password !== confirmPassword) {
                setError("Passwords do not match");
                return;
            }

            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data?.message || "Something went wrong");
                return;
            }

            await signIn("credentials", {
                email,
                password,
                callbackUrl: "/dashboard",
            });

        } catch (err) {
            console.log('`', err);
            setError("Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl"
            >

                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-white">
                        Create Account
                    </h1>
                    <p className="text-gray-400 mt-1 text-sm">
                        Join{" "}
                        <span className="text-indigo-400 font-semibold">
                            SupportPilot
                        </span>{" "}
                        today
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm text-center animate-pulse">
                        {error}
                    </div>
                )}

                <div className="space-y-4">

                    <input
                        className="w-full p-3 rounded-lg bg-white/5 text-white border border-white/10 outline-none focus:border-indigo-500 transition"
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        className="w-full p-3 rounded-lg bg-white/5 text-white border border-white/10 outline-none focus:border-indigo-500 transition"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full p-3 pr-10 rounded-lg bg-white/5 text-white border border-white/10 outline-none focus:border-indigo-500 transition"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="w-full p-3 pr-10 rounded-lg bg-white/5 text-white border border-white/10 outline-none focus:border-indigo-500 transition"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSignup()}
                        />

                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSignup}
                        disabled={loading || !email || !password || !name}
                        className="w-full p-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white font-semibold transition"
                    >
                        {loading ? "Creating account..." : "Sign Up"}
                    </motion.button>

                    <p className="text-sm text-center text-gray-400">
                        Already have an account?{" "}
                        <a href="/login" className="text-indigo-400 hover:underline">
                            Sign in
                        </a>
                    </p>

                </div>
            </motion.div>
        </div>
    );
}