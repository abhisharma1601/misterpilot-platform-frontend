// Admin dashboard dummy data — wireframe stage

export interface DummyUser {
  id: number;
  name: string;
  email: string;
  walletBalance: number;
  joined: string;
  active: boolean;
}

export interface DummyTransaction {
  id: number;
  amount: number;
  type: "credit" | "debit";
  status: "success" | "pending" | "failed";
  userId: number;
  referenceId: string;
  date: string;
}

export interface DummyApiKey {
  id: number;
  maskedKey: string;
  status: "active" | "inactive";
  lastUsed: string;
  user: string;
}

export interface DailyVolumePoint {
  date: string;
  volume: number;
}

export interface DailyTokenCostPoint {
  date: string;
  cacheHitCost: number;
  cacheMissCost: number;
}

// ---- Generate 30 days of date labels ----
function last30Days(): string[] {
  const dates: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().slice(0, 10)); // YYYY-MM-DD
  }
  return dates;
}

const DAYS = last30Days();

function rand(min: number, max: number) {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

export const dailyVolume: DailyVolumePoint[] = DAYS.map((date) => ({
  date,
  volume: rand(800, 4500),
}));

export const dailyTokenCost: DailyTokenCostPoint[] = DAYS.map((date) => ({
  date,
  cacheHitCost: rand(20, 300),
  cacheMissCost: rand(50, 700),
}));

export const totalUsers = 248;
export const usersThisWeek = 12;
export const totalRevenue = 184_350.5;
export const revenueThisMonth = 22_410.75;
export const transactionsToday = 143;
export const transactionsTodayVolume = 18_920.0;
export const activeApiKeys = 87;
export const totalApiKeys = 104;

export const recentTransactions: DummyTransaction[] = [
  {
    id: 10234,
    amount: 500.0,
    type: "credit",
    status: "success",
    userId: 42,
    referenceId: "REF-9A2F1",
    date: "2026-03-18T14:22:00Z",
  },
  {
    id: 10233,
    amount: 250.0,
    type: "debit",
    status: "success",
    userId: 17,
    referenceId: "REF-8C3D4",
    date: "2026-03-18T13:05:00Z",
  },
  {
    id: 10232,
    amount: 1200.0,
    type: "credit",
    status: "pending",
    userId: 55,
    referenceId: "REF-7B1E2",
    date: "2026-03-18T11:48:00Z",
  },
  {
    id: 10231,
    amount: 75.5,
    type: "debit",
    status: "failed",
    userId: 31,
    referenceId: "REF-6A0C9",
    date: "2026-03-18T10:30:00Z",
  },
  {
    id: 10230,
    amount: 3400.0,
    type: "credit",
    status: "success",
    userId: 8,
    referenceId: "REF-5F9B7",
    date: "2026-03-17T23:15:00Z",
  },
  {
    id: 10229,
    amount: 180.0,
    type: "debit",
    status: "success",
    userId: 63,
    referenceId: "REF-4D8A3",
    date: "2026-03-17T19:42:00Z",
  },
];

export const allUsers: DummyUser[] = [
  {
    id: 248, name: "Priya Sharma", email: "priya@example.com", walletBalance: 2450.0, joined: "2026-03-18T09:15:00Z", active: true,
  },
  {
    id: 247, name: "Rahul Mehta", email: "rahul.m@example.com", walletBalance: 780.5, joined: "2026-03-17T16:30:00Z", active: true,
  },
  {
    id: 246, name: "Ananya Patel", email: "ananya.p@example.com", walletBalance: 12000.0, joined: "2026-03-17T11:00:00Z", active: true,
  },
  {
    id: 245, name: "Vikram Joshi", email: "vikram@example.com", walletBalance: 320.0, joined: "2026-03-16T14:45:00Z", active: false,
  },
  {
    id: 244, name: "Sneha Reddy", email: "sneha.r@example.com", walletBalance: 5600.75, joined: "2026-03-16T08:20:00Z", active: true,
  },
  {
    id: 243, name: "Amit Kumar", email: "amit.k@example.com", walletBalance: 150.0, joined: "2026-03-15T12:10:00Z", active: false,
  },
  {
    id: 242, name: "Neha Gupta", email: "neha.g@example.com", walletBalance: 8900.0, joined: "2026-03-15T09:45:00Z", active: true,
  },
  {
    id: 241, name: "Rajesh Iyer", email: "rajesh.i@example.com", walletBalance: 0.0, joined: "2026-03-14T18:30:00Z", active: false,
  },
  {
    id: 240, name: "Kavita Rao", email: "kavita.r@example.com", walletBalance: 3450.5, joined: "2026-03-14T14:00:00Z", active: true,
  },
  {
    id: 239, name: "Deepak Singh", email: "deepak.s@example.com", walletBalance: 2100.0, joined: "2026-03-13T11:20:00Z", active: true,
  },
  {
    id: 238, name: "Meera Nair", email: "meera.n@example.com", walletBalance: 450.25, joined: "2026-03-13T08:05:00Z", active: false,
  },
  {
    id: 237, name: "Suresh Pillai", email: "suresh.p@example.com", walletBalance: 6780.0, joined: "2026-03-12T17:55:00Z", active: true,
  },
  {
    id: 236, name: "Lakshmi Venkat", email: "lakshmi.v@example.com", walletBalance: 1100.0, joined: "2026-03-12T15:30:00Z", active: true,
  },
  {
    id: 235, name: "Arjun Malhotra", email: "arjun.m@example.com", walletBalance: 85.0, joined: "2026-03-11T10:15:00Z", active: false,
  },
  {
    id: 234, name: "Ritu Agarwal", email: "ritu.a@example.com", walletBalance: 15500.0, joined: "2026-03-11T07:40:00Z", active: true,
  },
  {
    id: 233, name: "Manoj Tiwari", email: "manoj.t@example.com", walletBalance: 920.0, joined: "2026-03-10T16:00:00Z", active: true,
  },
  {
    id: 232, name: "Divya Krishnan", email: "divya.k@example.com", walletBalance: 4400.0, joined: "2026-03-10T13:25:00Z", active: false,
  },
];

export const recentUsers: DummyUser[] = allUsers.slice(0, 5);

// ---- Cashflow-specific data ----

export interface TokenUsageByModel {
  model: string;
  tokens: number;
  costInr: number;
  pct: number;
}

export interface PeriodSummary {
  label: string;
  period: "week" | "month" | "quarter";
  revenue: number;
  transactions: number;
  avgTxnValue: number;
  trend: "up" | "down" | "flat";
  trendPct: number;
}

export interface WeeklyRevenuePoint {
  week: string;
  revenue: number;
  transactions: number;
}

export const tokenUsageByModel: TokenUsageByModel[] = [
  { model: "GPT-4o", tokens: 8420000, costInr: 42100, pct: 42.1 },
  { model: "Claude 3.5 Sonnet", tokens: 5210000, costInr: 31260, pct: 26.1 },
  { model: "Gemini 2.0 Flash", tokens: 3180000, costInr: 6360, pct: 15.9 },
  { model: "GPT-4o-mini", tokens: 1950000, costInr: 2925, pct: 9.8 },
  { model: "Claude 3.5 Haiku", tokens: 1240000, costInr: 9920, pct: 6.1 },
];

export const totalTokenUsage = tokenUsageByModel.reduce((s, m) => s + m.tokens, 0);
export const totalTokenCost = tokenUsageByModel.reduce((s, m) => s + m.costInr, 0);

// Profit = 75% of total wallet balances across all users
export const totalWalletBalance = allUsers.reduce((s, u) => s + u.walletBalance, 0);
export const profit = totalWalletBalance * 0.75;

// DeepSeek current balance — amount owed to DeepSeek for API usage
export const rechargeDebt = 35_420.75;

export const periodSummaries: PeriodSummary[] = [
  {
    label: "This Week", period: "week", revenue: 18420.5, transactions: 482,
    avgTxnValue: 38.22, trend: "up", trendPct: 8.3,
  },
  {
    label: "This Month", period: "month", revenue: 78240.0, transactions: 2140,
    avgTxnValue: 36.56, trend: "up", trendPct: 12.7,
  },
  {
    label: "This Quarter", period: "quarter", revenue: 224500.0, transactions: 6180,
    avgTxnValue: 36.33, trend: "up", trendPct: 18.4,
  },
];

export const weeklyRevenue: WeeklyRevenuePoint[] = [
  { week: "W1 Jan", revenue: 41200, transactions: 910 },
  { week: "W2 Jan", revenue: 38500, transactions: 870 },
  { week: "W3 Jan", revenue: 44100, transactions: 950 },
  { week: "W4 Jan", revenue: 39800, transactions: 880 },
  { week: "W1 Feb", revenue: 45600, transactions: 1020 },
  { week: "W2 Feb", revenue: 42300, transactions: 940 },
  { week: "W3 Feb", revenue: 48100, transactions: 1080 },
  { week: "W4 Feb", revenue: 44200, transactions: 990 },
  { week: "W1 Mar", revenue: 51200, transactions: 1150 },
  { week: "W2 Mar", revenue: 48600, transactions: 1090 },
  { week: "W3 Mar", revenue: 55400, transactions: 1240 },
  { week: "W4 Mar", revenue: 18420, transactions: 482 },
];

export const cashflowTransactions: DummyTransaction[] = [
  { id: 10456, amount: 500.0, type: "credit", status: "success", userId: 42, referenceId: "REF-WD3F2", date: "2026-03-18T14:22:00Z" },
  { id: 10455, amount: 1200.0, type: "credit", status: "success", userId: 88, referenceId: "REF-XC9A1", date: "2026-03-18T13:10:00Z" },
  { id: 10454, amount: 340.5, type: "debit", status: "success", userId: 17, referenceId: "REF-PL7B3", date: "2026-03-18T12:05:00Z" },
  { id: 10453, amount: 2500.0, type: "credit", status: "pending", userId: 55, referenceId: "REF-MN4K8", date: "2026-03-18T11:20:00Z" },
  { id: 10452, amount: 180.0, type: "debit", status: "failed", userId: 31, referenceId: "REF-QW2E5", date: "2026-03-18T10:15:00Z" },
  { id: 10451, amount: 890.0, type: "credit", status: "success", userId: 8, referenceId: "REF-ZX6R9", date: "2026-03-18T09:30:00Z" },
  { id: 10450, amount: 4200.0, type: "credit", status: "success", userId: 72, referenceId: "REF-AS1T7", date: "2026-03-17T18:45:00Z" },
  { id: 10449, amount: 650.0, type: "debit", status: "success", userId: 63, referenceId: "REF-GH8U4", date: "2026-03-17T16:00:00Z" },
  { id: 10448, amount: 175.0, type: "debit", status: "success", userId: 29, referenceId: "REF-JK5Y2", date: "2026-03-17T14:30:00Z" },
  { id: 10447, amount: 3100.0, type: "credit", status: "success", userId: 41, referenceId: "REF-DF3V6", date: "2026-03-17T11:00:00Z" },
  { id: 10446, amount: 95.0, type: "debit", status: "failed", userId: 94, referenceId: "REF-BN9W1", date: "2026-03-16T17:20:00Z" },
  { id: 10445, amount: 5600.0, type: "credit", status: "success", userId: 15, referenceId: "REF-CV7H3", date: "2026-03-16T10:45:00Z" },
];

export const apiKeys: DummyApiKey[] = [
  {
    id: 1,
    maskedKey: "sk-••••4f2a",
    status: "active",
    lastUsed: "2026-03-18T14:55:00Z",
    user: "Priya Sharma",
  },
  {
    id: 2,
    maskedKey: "sk-••••8b1c",
    status: "active",
    lastUsed: "2026-03-18T13:20:00Z",
    user: "Rahul Mehta",
  },
  {
    id: 3,
    maskedKey: "sk-••••c9e7",
    status: "inactive",
    lastUsed: "2026-03-10T06:10:00Z",
    user: "Amit Kumar",
  },
  {
    id: 4,
    maskedKey: "sk-••••2d5f",
    status: "active",
    lastUsed: "2026-03-18T14:12:00Z",
    user: "Sneha Reddy",
  },
  {
    id: 5,
    maskedKey: "sk-••••7a3b",
    status: "active",
    lastUsed: "2026-03-18T11:48:00Z",
    user: "Ananya Patel",
  },
];

// ---- Offers ----

export interface DummyOffer {
  id: number;
  name: string;
  code: string;
  description: string;
  discountType: "flat" | "percent" | "tokens";
  discountValue: number;
  enabled: boolean;
  usageCount: number;
  usagePerUserLimit: number;
  totalSpent: number;
  createdAt: string;
}

export const offers: DummyOffer[] = [
  {
    id: 1,
    name: "Welcome Bonus",
    code: "WELCOME50",
    description: "₹50 flat credit for all new user sign-ups",
    discountType: "flat",
    discountValue: 50,
    enabled: true,
    usageCount: 1842,
    usagePerUserLimit: 1,
    totalSpent: 92100,
    createdAt: "2026-01-15T10:00:00Z",
  },
  {
    id: 2,
    name: "Referral Credit",
    code: "REFER100",
    description: "₹100 credit per successful referral",
    discountType: "flat",
    discountValue: 100,
    enabled: true,
    usageCount: 562,
    usagePerUserLimit: 10,
    totalSpent: 56200,
    createdAt: "2026-01-20T14:30:00Z",
  },
  {
    id: 3,
    name: "Bulk Recharge 10%",
    code: "BULK10",
    description: "10% extra credits on recharges above ₹5,000",
    discountType: "percent",
    discountValue: 10,
    enabled: true,
    usageCount: 328,
    usagePerUserLimit: 3,
    totalSpent: 19680,
    createdAt: "2026-02-01T09:00:00Z",
  },
  {
    id: 4,
    name: "Starter Pack",
    code: "STARTER10K",
    description: "Free 10,000 tokens for first-time API users",
    discountType: "tokens",
    discountValue: 10000,
    enabled: true,
    usageCount: 915,
    usagePerUserLimit: 1,
    totalSpent: 9150000,
    createdAt: "2026-02-10T11:15:00Z",
  },
  {
    id: 5,
    name: "Weekend Special",
    code: "WEEKEND15",
    description: "15% extra credits on all weekend recharges",
    discountType: "percent",
    discountValue: 15,
    enabled: false,
    usageCount: 217,
    usagePerUserLimit: 5,
    totalSpent: 5425,
    createdAt: "2026-02-22T16:45:00Z",
  },
  {
    id: 6,
    name: "Enterprise Trial",
    code: "ENT500",
    description: "₹500 credits for verified enterprise accounts",
    discountType: "flat",
    discountValue: 500,
    enabled: true,
    usageCount: 74,
    usagePerUserLimit: 1,
    totalSpent: 37000,
    createdAt: "2026-03-05T08:20:00Z",
  },
  {
    id: 7,
    name: "Festival Bonanza",
    code: "FEST20",
    description: "20% off on all recharges during festival season",
    discountType: "percent",
    discountValue: 20,
    enabled: false,
    usageCount: 0,
    usagePerUserLimit: 2,
    totalSpent: 0,
    createdAt: "2026-03-12T12:00:00Z",
  },
];
