"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginClient() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await signIn("credentials", {
                email,
                password,
                callbackUrl: "/dashboard",
                redirect: false,
            });

            if (res?.error) {
                setError("Invalid email or password");
                return;
            }

            window.location.href = "/dashboard";
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl"
            >
                <h1 className="text-3xl font-bold text-white text-center">
                    Welcome Back
                </h1>

                {error && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-lg text-center">
                        {error}
                    </div>
                )}

                <div className="space-y-4 mt-6">

                    <input
                        className="w-full p-3 rounded-lg bg-white/5 text-white border border-white/10"
                        placeholder="Email address"
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
                            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full p-3 bg-indigo-600 rounded-lg text-white font-semibold"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </motion.button>

                    <p className="text-sm text-center text-gray-400">
                        New here?{" "}
                        <a href="/signup" className="text-indigo-400 hover:underline">
                            Create account
                        </a>
                    </p>

                </div>
            </motion.div>
        </div>
    );
}