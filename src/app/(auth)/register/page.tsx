"use client";

import Link from "next/link";
import Image from "next/image";
import AuthForm from "@/components/auth/AuthForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/icon.png"
            alt="MisterPilot"
            width={48}
            height={48}
            className="w-12 h-12 rounded-xl mb-4"
          />
          <h1 className="text-xl font-bold text-text-primary tracking-tight">
            MisterPilot
          </h1>
        </div>

        {/* Card */}
        <div className="bg-bg-secondary border border-border rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-text-primary">Create Your Account</h2>
            <p className="text-sm text-text-secondary mt-1">
              Start building with AI in minutes.
            </p>
          </div>

          {/* Register Form */}
          <AuthForm mode="register" />
        </div>

        {/* Footer Link */}
        <p className="text-center text-sm text-text-muted mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-gold hover:text-gold-hover transition-colors font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
