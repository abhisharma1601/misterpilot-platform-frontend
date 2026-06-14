"use client";

import { useState } from "react";
import { Wallet, CircleCheck, CircleX, CircleAlert } from "lucide-react";
import { apiFetch } from "@/lib/api";

const PRESET_AMOUNTS = [50, 100, 199, 499];

declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay script"));
    document.body.appendChild(script);
  });
}

export default function AddFundsButton({ onSuccess }: { onSuccess?: () => void }) {
  const [selected, setSelected] = useState<number>(PRESET_AMOUNTS[0]);
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);

  const amount = custom ? Number(custom) : selected;
  const [creditResult, setCreditResult] = useState<{
    transactionId: number;
    amount: number;
    status: string;
    balanceAfter: number;
    message: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cancelled, setCancelled] = useState(false);

  async function failPayment(orderId: string) {
    await apiFetch("/wallet/fail-payment", {
      method: "POST",
      body: JSON.stringify({ orderId }),
    }).catch(() => {});
  }

  async function handleAddFunds() {
    if (!amount || amount < 1) {
      setError("Enter a valid amount");
      return;
    }
    setLoading(true);
    setError(null);
    setCreditResult(null);
    setCancelled(false);

    let razorpayOrderId = "";

    try {
      // Step 1: Create order on backend
      const orderData = await apiFetch<Record<string, string>>("/wallet/create-order", {
        method: "POST",
        body: JSON.stringify({ amount }),
      });
      razorpayOrderId = orderData.orderId ?? orderData.id ?? orderData.order_id;
      if (!razorpayOrderId) {
        throw new Error(`create-order response missing orderId: ${JSON.stringify(orderData)}`);
      }

      // Step 2: Load Razorpay checkout script
      await loadRazorpayScript();

      const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!keyId) {
        throw new Error("Payment configuration error. Please contact support.");
      }

      // Step 3: Open Razorpay checkout
      const paymentResponse = await new Promise<{
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }>((resolve, reject) => {
        const rzp = new window.Razorpay({
          key: keyId,
          amount: amount * 100, // paise
          currency: "INR",
          order_id: razorpayOrderId,
          name: "MisterPilot",
          description: `Wallet Top-up ₹${amount}`,
          handler(response: {
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
          }) {
            resolve(response);
          },
          modal: {
            ondismiss() {
              reject(new Error("Payment cancelled"));
            },
          },
        });
        rzp.open();
      });

      // Step 4: Credit wallet
      const creditData = await apiFetch<{
        transactionId: number;
        amount: number;
        status: string;
        balanceAfter: number;
        message: string;
      }>("/wallet/credit", {
        method: "POST",
        body: JSON.stringify({
          orderId: paymentResponse.razorpay_order_id,
          paymentId: paymentResponse.razorpay_payment_id,
          signature: paymentResponse.razorpay_signature,
        }),
      });

      if (creditData.status !== "SUCCESS") {
        throw new Error(creditData.message ?? "Payment failed — wallet not credited");
      }

      setCreditResult(creditData);
      onSuccess?.();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg === "Payment cancelled") {
        setCancelled(true);
        if (razorpayOrderId) await failPayment(razorpayOrderId);
      } else {
        setError(msg);
        if (razorpayOrderId) await failPayment(razorpayOrderId);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-bg-secondary border border-border rounded-xl p-6 w-full max-w-sm space-y-5">
      <div>
        <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">Select Amount</p>
        <div className="grid grid-cols-4 gap-2">
          {PRESET_AMOUNTS.map((amt) => (
            <button
              key={amt}
              onClick={() => { setSelected(amt); setCustom(""); }}
              disabled={loading}
              className={`py-2.5 rounded-lg text-sm font-semibold border transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                !custom && selected === amt
                  ? "bg-gold text-[#071B1C] border-gold shadow-[0_0_12px_rgba(var(--color-gold-rgb,212,175,55),0.3)]"
                  : "bg-bg-tertiary text-text-secondary border-border hover:border-gold/50 hover:text-text-primary"
              }`}
            >
              ₹{amt}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-text-muted">or enter custom</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted font-medium">₹</span>
        <input
          type="number"
          min={1}
          placeholder="0"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          disabled={loading}
          className={`w-full pl-8 pr-4 py-2.5 rounded-lg text-sm font-medium border bg-bg-tertiary text-text-primary placeholder:text-text-muted transition-colors disabled:opacity-50 outline-none ${
            custom ? "border-gold" : "border-border hover:border-border-hover focus:border-gold"
          }`}
        />
      </div>

      <button
        onClick={handleAddFunds}
        disabled={loading || !amount || amount < 1}
        className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-gold hover:bg-gold-hover disabled:opacity-50 disabled:cursor-not-allowed text-[#071B1C] text-sm font-semibold rounded-lg transition-colors"
      >
        <Wallet className="w-4 h-4" />
        {loading ? "Processing…" : `Add ₹${amount || "—"} to Wallet`}
      </button>

      {cancelled && (
        <div className="flex items-start gap-2.5 px-3 py-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <CircleAlert className="w-4 h-4 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-warning">Payment Cancelled</p>
            <p className="text-xs text-text-secondary mt-0.5">You closed the payment window. No amount was deducted.</p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2.5 px-3 py-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <CircleX className="w-4 h-4 text-error shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-error">Payment Failed</p>
            <p className="text-xs text-text-secondary mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {creditResult && (
        <div className="flex items-start gap-2.5 px-3 py-3 bg-green-muted border border-green-500/20 rounded-lg">
          <CircleCheck className="w-4 h-4 text-green shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-green">{creditResult.message}</p>
            <p className="text-xs text-text-secondary">
              ₹{creditResult.amount.toFixed(2)} added · New balance:{" "}
              <span className="text-text-primary font-medium">
                ₹{creditResult.balanceAfter.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </p>
            <p className="text-xs text-text-muted">Txn #{creditResult.transactionId}</p>
          </div>
        </div>
      )}
    </div>
  );
}
