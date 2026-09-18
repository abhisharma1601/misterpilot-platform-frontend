"use client";

import { useState } from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  UserRound,
  Wallet,
  Tag,
  LogOut,
  Percent,
  IndianRupee,
  Zap,
  Pencil,
  Plus,
  X,
  Check,
  Copy,
  RefreshCw,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import {
  offers as initialOffers,
  type DummyOffer,
} from "@/lib/admin/dummyData";

// ---- Helpers ----

function formatINR(n: number) {
  return n.toLocaleString("en-IN", { minimumFractionDigits: 2 });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function NavLink({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <a
      href={href}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "bg-gold/15 text-gold"
          : "text-text-secondary hover:text-text-primary hover:bg-bg-hover"
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}

function DiscountBadge({ type, value }: { type: DummyOffer["discountType"]; value: number }) {
  const map: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
    flat: {
      label: `₹${value} off`,
      icon: <IndianRupee className="w-3 h-3" />,
      cls: "bg-gold/10 text-gold border-gold/30",
    },
    percent: {
      label: `${value}% off`,
      icon: <Percent className="w-3 h-3" />,
      cls: "bg-green/10 text-green border-green/30",
    },
    tokens: {
      label: `${(value / 1000).toFixed(0)}K tokens`,
      icon: <Zap className="w-3 h-3" />,
      cls: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    },
  };
  const m = map[type];
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border ${m.cls}`}
    >
      {m.icon}
      {m.label}
    </span>
  );
}

// ---- Page ----

export default function AdminOffersPage() {
  const [offers, setOffers] = useState(initialOffers);
  const [editingOffer, setEditingOffer] = useState<DummyOffer | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Create form state
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState<DummyOffer["discountType"]>("flat");
  const [discountValue, setDiscountValue] = useState(0);
  const [usagePerUserLimit, setUsagePerUserLimit] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [codeError, setCodeError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const existingCodes = new Set(offers.map((o) => o.code.toUpperCase()));

  const activeOffers = offers.filter((o) => o.enabled).length;
  const totalUsage = offers.reduce((s, o) => s + o.usageCount, 0);
  const totalSpent = offers.reduce((s, o) => s + o.totalSpent, 0);

  function toggleOffer(id: number) {
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, enabled: !o.enabled } : o))
    );
  }

  function generateCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCode(result);
    if (existingCodes.has(result)) {
      setCodeError("This code is already in use. Click generate again.");
    } else {
      setCodeError("");
    }
  }

  function handleCodeChange(val: string) {
    const upper = val.toUpperCase();
    setCode(upper);
    if (existingCodes.has(upper)) {
      setCodeError("This code is already in use. Please choose a different one.");
    } else {
      setCodeError("");
    }
  }

  function handleSubmit() {
    if (!name.trim() || !code.trim() || discountValue <= 0) return;
    if (codeError) return;

    const newOffer: DummyOffer = {
      id: Math.max(0, ...offers.map((o) => o.id)) + 1,
      name: name.trim(),
      code: code.trim().toUpperCase(),
      description: description.trim(),
      discountType,
      discountValue,
      enabled,
      usageCount: 0,
      usagePerUserLimit,
      totalSpent: 0,
      createdAt: startDate || new Date().toISOString(),
    };

    setOffers((prev) => [newOffer, ...prev]);
    setSubmitted(true);
  }

  function handleCopyCode() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function resetCreateForm() {
    setName("");
    setCode("");
    setDescription("");
    setDiscountType("flat");
    setDiscountValue(0);
    setUsagePerUserLimit(0);
    setStartDate("");
    setEndDate("");
    setEnabled(true);
    setCodeError("");
    setSubmitted(false);
    setCopied(false);
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* ===== Nav Bar ===== */}
      <nav className="sticky top-0 z-10 bg-bg-secondary/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-6 md:px-8 h-14">
          <div className="flex items-center gap-2">
            <Image
              src="/icon.png"
              alt="MisterPilot"
              width={28}
              height={28}
              className="w-7 h-7 rounded-md"
            />
            <span className="text-sm font-semibold text-text-primary tracking-tight">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-1">
            <NavLink href="/admin/dashboard" icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" />
            <NavLink href="/admin/users" icon={<UserRound className="w-4 h-4" />} label="Users" />
            <NavLink href="/admin/cashflow" icon={<Wallet className="w-4 h-4" />} label="CashFlow" />
            <NavLink href="/admin/offers" icon={<Tag className="w-4 h-4" />} label="Offers" active />
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-muted hover:text-error hover:bg-error/10 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>

      <div className="p-6 md:p-8 space-y-8">
        {/* ===== Header ===== */}
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Offers</h1>
          <p className="text-sm text-text-muted mt-1">
            Manage promotional offers, track usage, and control availability.
          </p>
        </div>

        {/* ===== KPI Cards ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-bg-secondary border border-border rounded-xl p-5">
            <span className="text-xs text-text-muted">Total Offers</span>
            <div className="text-xl font-bold text-text-primary mt-1">{offers.length}</div>
          </div>
          <div className="bg-bg-secondary border border-border rounded-xl p-5">
            <span className="text-xs text-text-muted">Active</span>
            <div className="text-xl font-bold text-green mt-1">{activeOffers}</div>
          </div>
          <div className="bg-bg-secondary border border-border rounded-xl p-5">
            <span className="text-xs text-text-muted">Total Usage</span>
            <div className="text-xl font-bold text-text-primary mt-1">{totalUsage.toLocaleString()}</div>
          </div>
          <div className="bg-bg-secondary border border-border rounded-xl p-5">
            <span className="text-xs text-text-muted">Total Spent</span>
            <div className="text-xl font-bold text-text-primary mt-1">₹{formatINR(totalSpent)}</div>
          </div>
        </div>

        {/* ===== Offers Table ===== */}
        <div className="bg-bg-secondary border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-medium text-text-primary">All Offers</h3>
            <button
              onClick={() => { resetCreateForm(); setShowCreateModal(true); }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gold text-bg-primary hover:bg-gold/90 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Create Offer
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Offer</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Code</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Discount</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Usage</th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Limit/User</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Total Spent</th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Active</th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Edit</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer) => (
                  <tr
                    key={offer.id}
                    className={`border-b border-border/50 hover:bg-bg-tertiary/50 transition-colors ${
                      !offer.enabled ? "opacity-50" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-text-primary">{offer.name}</div>
                      <div className="text-xs text-text-muted mt-0.5 max-w-[200px] truncate">
                        {offer.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-xs font-mono bg-bg-primary border border-border rounded-md px-2 py-1 text-gold">
                        {offer.code}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <DiscountBadge type={offer.discountType} value={offer.discountValue} />
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary font-mono text-right">
                      {offer.usageCount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary font-mono text-center">
                      {offer.usagePerUserLimit === 0 ? (
                        <span className="text-text-muted">∞</span>
                      ) : (
                        offer.usagePerUserLimit
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary font-mono text-right">
                      ₹{formatINR(offer.totalSpent)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {/* Toggle Switch */}
                      <button
                        onClick={() => toggleOffer(offer.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          offer.enabled ? "bg-green" : "bg-text-muted/30"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                            offer.enabled ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setEditingOffer(offer)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gold hover:bg-gold/10 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ===== Create Offer Modal ===== */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => { setShowCreateModal(false); resetCreateForm(); }}
          />

          {/* Modal */}
          <div className="relative bg-bg-secondary border border-border rounded-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-bg-secondary rounded-t-2xl z-10">
              <h2 className="text-base font-semibold text-text-primary">
                {submitted ? "Offer Created" : "Create New Offer"}
              </h2>
              <button
                onClick={() => { setShowCreateModal(false); resetCreateForm(); }}
                className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitted ? (
              /* Success Screen */
              <div className="px-6 py-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-green/10 border border-green/30 flex items-center justify-center mb-5">
                  <Check className="w-8 h-8 text-green" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Offer Created Successfully!</h3>
                <p className="text-sm text-text-secondary mb-6 max-w-xs">
                  Your offer <span className="text-gold font-medium">{name}</span> is live. Share the code with your users.
                </p>

                {/* Code Display */}
                <div className="bg-bg-primary border border-border rounded-xl p-4 mb-6 w-full max-w-xs">
                  <span className="text-xs text-text-muted block mb-2">Offer Code</span>
                  <div className="flex items-center justify-between gap-3">
                    <code className="text-xl font-mono font-bold text-gold tracking-wider">{code}</code>
                    <button
                      onClick={handleCopyCode}
                      className="p-2 rounded-lg text-text-muted hover:text-gold hover:bg-gold/10 transition-colors"
                      title="Copy code"
                    >
                      {copied ? <Check className="w-4 h-4 text-green" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Success Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => { setShowCreateModal(false); resetCreateForm(); }}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 inline mr-1.5" />
                    Back to Offers
                  </button>
                  <button
                    onClick={() => {
                      setName("");
                      setCode("");
                      setDescription("");
                      setDiscountType("flat");
                      setDiscountValue(0);
                      setUsagePerUserLimit(0);
                      setStartDate("");
                      setEndDate("");
                      setEnabled(true);
                      setCodeError("");
                      setSubmitted(false);
                      setCopied(false);
                    }}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-gold text-bg-primary hover:bg-gold/90 transition-colors"
                  >
                    <Plus className="w-4 h-4 inline mr-1.5" />
                    Create Another
                  </button>
                </div>
              </div>
            ) : (
              /* Create Form */
              <>
                <div className="px-6 py-5 space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1.5">
                      Offer Name <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Welcome Bonus"
                      className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                    />
                  </div>

                  {/* Code */}
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1.5">
                      Offer Code <span className="text-error">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={code}
                          onChange={(e) => handleCodeChange(e.target.value)}
                          placeholder="e.g. WELCOME50"
                          maxLength={20}
                          className={`w-full bg-bg-primary border rounded-lg px-3 py-2 text-sm font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 uppercase ${
                            codeError
                              ? "border-error focus:border-error/50 focus:ring-error/20"
                              : "border-border focus:border-gold/50 focus:ring-gold/20"
                          }`}
                        />
                        {code && !codeError && (
                          <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green" />
                        )}
                      </div>
                      <button
                        onClick={generateCode}
                        className="px-3 py-2 rounded-lg text-xs font-medium text-gold hover:bg-gold/10 border border-border transition-colors inline-flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Generate
                      </button>
                    </div>
                    {codeError && (
                      <p className="text-xs text-error mt-1">{codeError}</p>
                    )}
                    {!codeError && (
                      <p className="text-xs text-text-muted mt-1">Unique code users will enter to redeem this offer</p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1.5">
                      Description
                    </label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="e.g. Get ₹50 off your first API purchase"
                      className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                    />
                  </div>

                  {/* Discount type + value row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-1.5">
                        Discount Type
                      </label>
                      <select
                        value={discountType}
                        onChange={(e) => setDiscountType(e.target.value as DummyOffer["discountType"])}
                        className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                      >
                        <option value="flat">Flat (₹)</option>
                        <option value="percent">Percent (%)</option>
                        <option value="tokens">Tokens</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-1.5">
                        Value <span className="text-error">*</span>
                      </label>
                      <input
                        type="number"
                        value={discountValue || ""}
                        onChange={(e) => setDiscountValue(Number(e.target.value))}
                        min={0}
                        placeholder={discountType === "percent" ? "15" : "500"}
                        className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                      />
                    </div>
                  </div>

                  {/* Usage Per User Limit */}
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1.5">
                      Usage Per User Limit
                    </label>
                    <input
                      type="number"
                      value={usagePerUserLimit || ""}
                      onChange={(e) => setUsagePerUserLimit(Number(e.target.value))}
                      min={0}
                      placeholder="0 = unlimited"
                      className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                    />
                    <p className="text-xs text-text-muted mt-1">Set 0 for unlimited usage per user</p>
                  </div>

                  {/* Date range */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-1.5">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-1.5">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                      />
                    </div>
                  </div>

                  {/* Enabled toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-text-primary">Active</span>
                      <p className="text-xs text-text-muted mt-0.5">
                        Make this offer immediately available to users
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEnabled(!enabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        enabled ? "bg-green" : "bg-text-muted/30"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                          enabled ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Live Preview Card */}
                  <div className="bg-bg-primary border border-border rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-gold" />
                      <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Live Preview</span>
                    </div>
                    <div className="border border-gold/20 rounded-lg p-4 bg-bg-secondary/50">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-sm font-semibold text-text-primary">
                            {name || "Offer Name"}
                          </h4>
                          {code && (
                            <code className="text-xs font-mono text-gold bg-bg-primary px-2 py-0.5 rounded mt-1 inline-block">
                              {code}
                            </code>
                          )}
                        </div>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            enabled
                              ? "bg-green/10 text-green border border-green/30"
                              : "bg-text-muted/10 text-text-muted border border-text-muted/20"
                          }`}
                        >
                          {enabled ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary mb-3">
                        {description || "Offer description will appear here"}
                      </p>
                      <div className="flex items-center justify-between">
                        <DiscountBadge type={discountType} value={discountValue || 0} />
                        <span className="text-xs text-text-muted">
                          {usagePerUserLimit === 0 ? "Unlimited uses" : `${usagePerUserLimit} use${usagePerUserLimit > 1 ? "s" : ""} per user`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
                  <button
                    onClick={() => { setShowCreateModal(false); resetCreateForm(); }}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!name.trim() || !code.trim() || discountValue <= 0 || !!codeError}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-gold text-bg-primary hover:bg-gold/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Create Offer
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ===== Edit Offer Modal ===== */}
      {editingOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setEditingOffer(null)}
          />

          {/* Modal */}
          <div className="relative bg-bg-secondary border border-border rounded-2xl w-full max-w-md mx-4 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="text-base font-semibold text-text-primary">Edit Offer</h2>
              <button
                onClick={() => setEditingOffer(null)}
                className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  Offer Name
                </label>
                <input
                  type="text"
                  defaultValue={editingOffer.name}
                  className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                />
              </div>

              {/* Code */}
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  Offer Code
                </label>
                <input
                  type="text"
                  defaultValue={editingOffer.code}
                  className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-sm font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 uppercase"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  Description
                </label>
                <input
                  type="text"
                  defaultValue={editingOffer.description}
                  className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                />
              </div>

              {/* Discount type + value row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">
                    Discount Type
                  </label>
                  <select
                    defaultValue={editingOffer.discountType}
                    className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                  >
                    <option value="flat">Flat (₹)</option>
                    <option value="percent">Percent (%)</option>
                    <option value="tokens">Tokens</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">
                    Value
                  </label>
                  <input
                    type="number"
                    defaultValue={editingOffer.discountValue}
                    className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                  />
                </div>
              </div>

              {/* Usage Per User Limit */}
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  Usage Per User Limit
                </label>
                <input
                  type="number"
                  defaultValue={editingOffer.usagePerUserLimit}
                  min={0}
                  className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                />
                <p className="text-xs text-text-muted mt-1">Set 0 for unlimited usage per user</p>
              </div>

              {/* Enabled toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-text-primary">Active</span>
                  <p className="text-xs text-text-muted mt-0.5">
                    Offer is visible and redeemable by users
                  </p>
                </div>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    editingOffer.enabled ? "bg-green" : "bg-text-muted/30"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                      editingOffer.enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Read-only stats */}
              <div className="bg-bg-primary border border-border rounded-lg p-4 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-text-muted">Usage Count</span>
                  <div className="text-sm font-mono font-medium text-text-primary mt-0.5">
                    {editingOffer.usageCount.toLocaleString()}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-text-muted">Total Spent</span>
                  <div className="text-sm font-mono font-medium text-text-primary mt-0.5">
                    ₹{formatINR(editingOffer.totalSpent)}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
              <button
                onClick={() => setEditingOffer(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setEditingOffer(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-gold text-bg-primary hover:bg-gold/90 transition-colors"
              >
                {/* TODO: replace with real API call */}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
