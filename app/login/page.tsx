"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-[350px] text-center">
        
        {!session ? (
          <>
            <h2 className="text-xl font-semibold text-red-500">
              Not logged in
            </h2>

            <p className="text-gray-500 mt-2">
              Please log in first to continue
            </p>

            <button
              onClick={() => signIn()}
              className="mt-5 bg-black text-white px-4 py-2 rounded-lg w-full"
            >
              Login
            </button>
          </>
        ) : (
          <>
            <h2 className="text-green-600 text-xl font-semibold">
              Already logged in
            </h2>

            <button
              onClick={() => router.push("/dashboard")}
              className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
            >
              Go to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
}