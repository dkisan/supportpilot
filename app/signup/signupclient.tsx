"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";

export default function SignupClient() {
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

            if (!name.trim()) return setError("Name is required");
            if (!email.trim()) return setError("Email is required");

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) return setError("Invalid email");

            if (!password) return setError("Password is required");
            if (password.length < 6) return setError("Min 6 chars");
            if (password !== confirmPassword)
                return setError("Passwords do not match");

            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data?.message || "Signup failed");
                return;
            }

            await signIn("credentials", {
                email,
                password,
                callbackUrl: "/dashboard",
            });

        } catch (err) {
            console.log(err);
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
                className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10"
            >
                <h1 className="text-3xl font-bold text-white text-center">
                    Create Account
                </h1>

                {error && (
                    <div className="mt-4 p-3 bg-red-500/10 text-red-300 rounded-lg text-sm text-center">
                        {error}
                    </div>
                )}

                <div className="space-y-4 mt-6">

                    <input
                        className="w-full p-3 rounded-lg bg-white/5 text-white border border-white/10"
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        className="w-full p-3 rounded-lg bg-white/5 text-white border border-white/10"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full p-3 pr-10 rounded-lg bg-white/5 text-white border border-white/10"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="w-full p-3 pr-10 rounded-lg bg-white/5 text-white border border-white/10"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-3 text-gray-400"
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSignup}
                        disabled={loading}
                        className="w-full p-3 bg-indigo-600 rounded-lg text-white font-semibold"
                    >
                        {loading ? "Creating..." : "Sign Up"}
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