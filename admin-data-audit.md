# Admin Panel — Data Audit

This document lists every piece of data displayed on each admin page. All data is currently hardcoded in `src/lib/admin/dummyData.ts`.

---

## 1. `/admin/dashboard`

### KPI Cards (4 cards)

| # | Card | Fields | Type | Notes |
|---|---|---|---|---|
| 1 | Total Users | `totalUsers` | number | Total registered users |
| | | `usersThisWeek` | number | New users in the last 7 days |
| 2 | Total Revenue | `totalRevenue` | number (INR) | Cumulative revenue |
| | | `revenueThisMonth` | number (INR) | Revenue in current calendar month |
| 3 | Transactions Today | `transactionsToday` | number | Count of transactions today |
| | | `transactionsTodayVolume` | number (INR) | Sum of transaction amounts today |

### Charts (2 charts)

| # | Chart | Fields | Type | Notes |
|---|---|---|---|---|
| 1 | Daily Transaction Volume (Line) | `dailyVolume` | `Array<{ date: string, volume: number }>` | 30 data points, last 30 days, INR |
| 2 | Daily Token Cost (Stacked Bar) | `dailyTokenCost` | `Array<{ date: string, cacheHitCost: number, cacheMissCost: number }>` | 30 data points, cache hit (green) + cache miss (gold), INR |

### Tables (2 tables)

| # | Table | Fields | Type | Notes |
|---|---|---|---|---|
| 1 | Recent Transactions | `recentTransactions` | `Array<{ id, amount, type, status, walletId, referenceId, date }>` | 6 rows. `type`: "credit" \| "debit". `status`: "success" \| "pending" \| "failed" |
| 2 | Recent Users | `recentUsers` | `Array<{ id, name, email, walletBalance, joined }>` | 5 rows, most recent signups |

---

## 2. `/admin/users`

### KPI Cards (3 cards, derived from user list)

| # | Card | Derived From | Notes |
|---|---|---|---|
| 1 | Total Users | `users.length` | Total count |
| 2 | Active | `users.filter(u => u.active).length` | Active users count |
| 3 | Total Balance | `users.reduce(sum, u => sum + u.walletBalance, 0)` | Sum of all wallet balances, INR |

### Filters

- **Tab filter**: Active \| Inactive (toggles which subset is shown)
- **Search bar**: filters by name, email, or `#id`

### Users Table (full list, filtered by tab + search)

| Column | Field | Type |
|---|---|---|
| # | `id` | number |
| Name | `name` | string |
| Email | `email` | string |
| Wallet Balance | `walletBalance` | number (INR) |
| Joined | `joined` | string (ISO 8601) |
| Status | `active` | boolean |
| Actions | — | Toggle button to flip `active` status |

### Action

| Action | What it does |
|---|---|
| Toggle active/inactive | Flips `active` boolean. Currently simulated with `setTimeout(400ms)`. Needs `PATCH /admin/users/:id/toggle`. |

---

## 3. `/admin/cashflow`

### KPI Cards (4 cards)

| # | Card | Field | Type | Notes |
|---|---|---|---|---|
| 1 | Total Revenue | `totalRevenue` | number (INR) | Platform-wide cumulative |
| 2 | Profit | `profit` | number (INR) | Computed as 75% of total wallet balances across all users |
| 3 | RechargeDebt | `rechargeDebt` | number (INR) | Amount owed to DeepSeek for API usage. Hardcoded ₹35,420.75 |
| 4 | Period Selector | `selectedPeriod` | "week" \| "month" \| "quarter" | Toggles which period summary is highlighted. Shows selected period's revenue + trend %. |

### Period Summary Cards (3 cards, clickable to change selected period)

| Field | Type | Notes |
|---|---|---|
| `label` | string | "This Week" / "This Month" / "This Quarter" |
| `period` | "week" \| "month" \| "quarter" | Identifier |
| `revenue` | number (INR) | Revenue for that period |
| `transactions` | number | Transaction count for that period |
| `avgTxnValue` | number (INR) | Average transaction value |
| `trend` | "up" \| "down" \| "flat" | Direction indicator |
| `trendPct` | number | Percentage change from previous period |

### Chart (1 chart)

| Chart | Fields | Type | Notes |
|---|---|---|---|
| Weekly Revenue + Transactions (Combo Bar+Line) | `weeklyRevenue` | `Array<{ week: string, revenue: number, transactions: number }>` | 12 weeks of data. Revenue as bars, transactions as line overlay. |

### Table (1 table)

| Table | Fields | Type | Notes |
|---|---|---|---|
| Transactions | `cashflowTransactions` | `Array<{ id, amount, type, status, walletId, referenceId, date }>` | 12 rows. `type`: "credit" \| "debit". `status`: "success" \| "pending" \| "failed". |

---

## 4. `/admin/offers`

### KPI Cards (4 cards, derived from offers list)

| # | Card | Derived From |
|---|---|---|
| 1 | Total Offers | `offers.length` |
| 2 | Active | `offers.filter(o => o.enabled).length` |
| 3 | Total Usage | `offers.reduce(sum, o => sum + o.usageCount, 0)` |
| 4 | Total Spent | `offers.reduce(sum, o => sum + o.totalSpent, 0)` (INR) |

### Offers Table

| Column | Field | Type | Notes |
|---|---|---|---|
| Offer | `name` | string | Bold primary text |
| | `description` | string | Secondary muted text, truncated |
| Code | `code` | string | Uppercase, gold monospace badge |
| Discount | `discountType` | "flat" \| "percent" \| "tokens" | Rendered as colored badge |
| | `discountValue` | number | Flat = INR off, Percent = % off, Tokens = token count |
| Usage | `usageCount` | number | Total times redeemed |
| Limit/User | `usagePerUserLimit` | number | 0 = unlimited (shows ∞) |
| Total Spent | `totalSpent` | number (INR) | Total discount value given |
| Active | `enabled` | boolean | Toggle switch |
| Edit | — | button | Opens edit modal |

### Create Modal (form fields)

| Field | Type | Required | Notes |
|---|---|---|---|
| Name | string | Yes | Offer display name |
| Code | string | Yes | Uppercase, unique, max 20 chars. "Generate" button creates random 8-char code. Validates uniqueness against existing codes. |
| Description | string | No | Plain text |
| Discount Type | "flat" \| "percent" \| "tokens" | Yes | Dropdown |
| Discount Value | number | Yes (> 0) | Number input |
| Usage Per User Limit | number | No | 0 = unlimited. Min 0. |
| Start Date | date | No | Date picker |
| End Date | date | No | Date picker |
| Active | boolean | Yes | Toggle, defaults to true |

Live preview card shows how the offer will appear to users.

### Edit Modal (form fields)

Same fields as Create, plus read-only stats:

| Read-only Field | Type |
|---|---|
| Usage Count | number |
| Total Spent | number (INR) |

### Actions

| Action | What it does |
|---|---|
| Toggle active | Flips `enabled` boolean inline |
| Create | Appends new offer to top of list with auto-incremented ID, usageCount=0, totalSpent=0 |
| Edit | Updates fields in-place (currently no save, placeholder) |

---

## Summary of All Data Types

```
DummyUser        { id, name, email, walletBalance, joined, active }
DummyTransaction { id, amount, type, status, walletId, referenceId, date }
DailyVolumePoint { date, volume }
DailyTokenCostPoint { date, cacheHitCost, cacheMissCost }
PeriodSummary    { label, period, revenue, transactions, avgTxnValue, trend, trendPct }
WeeklyRevenuePoint { week, revenue, transactions }
DummyOffer       { id, name, code, description, discountType, discountValue, enabled, usageCount, usagePerUserLimit, totalSpent, createdAt }

// Computed
profit        = totalWalletBalance * 0.75
rechargeDebt  = 35,420.75  (hardcoded)
```
