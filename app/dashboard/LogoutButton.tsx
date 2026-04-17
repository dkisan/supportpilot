"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition text-white font-medium"
    >
      Logout
    </button>
  );
}