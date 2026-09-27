# MisterPilot 2.0 — Website Redesign Spec

> Copy, wireframes, and strategy for the `feature/revamp-2.0` homepage.
> Grounded in the current site (`src/components/landing/*`): pay-as-you-go wallet in INR, no subscription, green `#35AA35` + gold brand accents, dark UI.
>
> **Placeholders:** anything in `[BRACKETS]` is a real number or asset we must supply before launch. Do not ship invented stats, logos, or testimonials. Competitor pricing is listed as "verify before publish" because it changes often.

---

## 0. Homepage Redesign Strategy (read this first)

### The positioning shift

| Old site says | New site must say |
|---|---|
| "Access multiple AI models through a single API" (infra / API-reseller framing) | "An AI coding platform that picks the right model for every task" (product / outcome framing) |
| DeepSeek-centric (dashboard mockups show only `deepseek-chat`) | Multi-provider: OpenAI, Claude, DeepSeek — routed automatically |
| Wallet + API keys are the hero | **MisterPilot Auto** is the hero. Wallet, keys, and dashboard are supporting proof of control and transparency |

### The one idea visitors must leave with

> **MisterPilot picks the best AI model for every coding task — automatically — inside VS Code, at pay-as-you-go prices.**

Everything else (BYOK, MCP, 1M context, local agent) is a *reason to believe* that idea, not a competing headline.

### Three audiences, three hooks

| Segment | Their pain | Our hook | Where they land on the page |
|---|---|---|---|
| Copilot users | Stuck on one vendor's model; limited control | "Keep Copilot Chat. Get every model." | Hero sub-copy → VS Code section |
| Cursor / Claude Code price-shoppers | $20–$200/mo subscriptions, rate limits | "No subscription. Pay only for tokens. Auto sends easy tasks to cheap models." | Why Auto → Pricing comparison |
| AI power users / teams | Juggling keys, providers, context limits, tool integrations | BYOK + MCP + 1M context + usage dashboard | Models → MCP & Agent → Reliability |

### Structural decisions

1. **Lead with Auto, not the dashboard.** Replace the current hero dashboard mockup with a live *routing animation* (prompt → router → model). The dashboard moves down into the Reliability section as proof of usage tracking.
2. **One primary CTA everywhere:** `Install for VS Code` (the product lives in the editor). Secondary CTA: `Create free account` (for wallet/BYOK setup). Today's site pushes `/register` first; for an extension, install is the lower-friction action.
3. **Cost is a feature, not a footnote.** Auto routing is *why* we can be cheaper. Tie the pricing section directly to the routing story.
4. **Keep every existing feature visible** but group them — existing features appear in the VS Code section (chat, generate, review, explain, refactor, Copilot compat) and Reliability section (keys, wallet, dashboard, auth, cloud).
5. **Honesty as a differentiator.** Show per-request model + cost in UI screenshots. Developers trust transparency more than superlatives.

### Section map: old → new

| Current component | New role |
|---|---|
| `HeroSection` | Rebuilt: Auto routing hero |
| `WhySection` | Becomes "Why Auto Routing Is Better" |
| `FeaturesSection` | Split into "Supported Models" + "MCP & Agent" |
| `HowItWorksSection` | Folded into "What Is MisterPilot Auto" (3-step flow) |
| `DevExperienceSection` | Becomes "VS Code Experience" |
| `AnalyticsSection` | Becomes "Enterprise Reliability" (dashboard lives here) |
| `TestimonialsSection` (exists, currently unused) | Becomes "Social Proof" strip |
| `PricingSection` | Rebuilt with comparison table |
| — (new) | `FAQSection` |
| `CTASection` | Rewritten final CTA |

---

## 1. SEO Headings & Metadata

### Page metadata (`src/app/layout.tsx` → `export const metadata`)

```ts
export const metadata: Metadata = {
  title: "MisterPilot — AI Coding Assistant with Automatic Model Selection",
  description:
    "MisterPilot Auto picks the best AI model — GPT, Claude, or DeepSeek — for every coding task in VS Code. Bring your own keys, 1M-token context, MCP support. Pay as you go, no subscription.",
  keywords: [
    "AI coding assistant", "VS Code AI extension", "Cursor alternative",
    "Claude Code alternative", "GitHub Copilot alternative", "AI model router",
    "bring your own API key", "MCP VS Code", "DeepSeek VS Code", "Claude VS Code",
  ],
  openGraph: {
    title: "MisterPilot — Stop Choosing Models. Start Building.",
    description:
      "One VS Code extension. OpenAI, Claude and DeepSeek. MisterPilot Auto routes every request to the right model automatically.",
    type: "website",
    // images: ["/og/misterpilot-auto.png"]  — 1200x630, routing diagram + tagline
  },
  twitter: {
    card: "summary_large_image",
    title: "MisterPilot — AI That Picks The Right AI",
    description: "Automatic model routing for coding in VS Code. Pay as you go.",
  },
};
```

- **Title length:** 63 chars (fits Google's ~60 with minimal truncation; trim "with" → "—" if needed).
- **Description:** 158 chars.

### Heading hierarchy (one H1 only)

```
H1  Stop Choosing Models. Start Building.
H2  Trusted by developers shipping every day             (social proof)
H2  MisterPilot Auto: AI That Picks The Right AI
H2  Why Automatic Model Routing Beats Picking Models Yourself
H2  All Your AI Models. One Workspace.
    H3 OpenAI · H3 Claude · H3 DeepSeek · H3 Bring Your Own Key
H2  The AI Coding Assistant That Lives in VS Code
H2  More Than Chat: MCP, Local Agents and Coding Tools
    H3 Connect AI To Everything (MCP) · H3 Your Agent Runs Where Your Code Lives
    H3 Built For Large Codebases · H3 Your AI Understands Your Workspace
H2  Built For Production
H2  MisterPilot vs Cursor, Claude Code and GitHub Copilot — Pricing
H2  Frequently Asked Questions
H2  Your Next Commit Deserves the Right Model
```

### Supporting SEO pages (phase 2 — high-intent, low-competition)

- `/vs/cursor` — "MisterPilot vs Cursor: pay-as-you-go AI coding"
- `/vs/claude-code` — "A cheaper Claude Code alternative inside VS Code"
- `/vs/copilot` — "GitHub Copilot alternative with Claude, GPT and DeepSeek"
- `/features/auto` — "Automatic AI model routing for developers"
- `/features/mcp` — "MCP in VS Code: connect AI to your tools"
- `/docs/byok` — "Use your own OpenAI / Anthropic / DeepSeek API key in VS Code"

Add `FAQPage` JSON-LD for the FAQ section and `SoftwareApplication` JSON-LD (category: DeveloperApplication, offers: price 0, "pay as you go").

---

## 2. Landing Page Wireframe

```
┌──────────────────────────────────────────────────────────────────────┐
│ NAV  [◆ MisterPilot]  Auto  Models  Features  Pricing  Docs   [Log in] [Install ▸] │
├──────────────────────────────────────────────────────────────────────┤
│ 1 HERO                                                               │
│  ┌──────────────── left ───────────────┐ ┌──────── right ──────────┐ │
│  │ pill: ✦ New — MisterPilot Auto      │ │  ROUTING ANIMATION      │ │
│  │ H1  Stop Choosing Models.           │ │  "fix typo in README"   │ │
│  │     Start Building.                 │ │     └→ ⚡ fast model     │ │
│  │ sub: Auto picks GPT/Claude/DeepSeek │ │  "add OAuth flow"       │ │
│  │ [Install for VS Code] [Create acct] │ │     └→ 🧠 reasoning      │ │
│  │ ✓ No subscription ✓ BYOK ✓ 1M ctx   │ │  "redesign data layer"  │ │
│  └─────────────────────────────────────┘ │     └→ ★ frontier        │ │
│                                          └─────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────┤
│ 2 SOCIAL PROOF   [N installs] [N requests routed] [rating]  logos…   │
│                  3 short dev quotes (carousel on mobile)             │
├──────────────────────────────────────────────────────────────────────┤
│ 3 WHAT IS AUTO   ① You ask → ② Auto analyzes → ③ Best model answers  │
│                  horizontal flowchart + "Model used: X · ₹0.0x" chip  │
├──────────────────────────────────────────────────────────────────────┤
│ 4 WHY AUTO       4 benefit cards: Better answers · Lower cost ·      │
│                  No switching · Fully automatic                      │
│                  + table: Manual picking vs MisterPilot Auto         │
├──────────────────────────────────────────────────────────────────────┤
│ 5 MODELS         [OpenAI] [Claude] [DeepSeek] logo cards             │
│                  BYOK panel: key input mock  "Use your own keys"     │
├──────────────────────────────────────────────────────────────────────┤
│ 6 VS CODE        Big screenshot (tabs: Chat · Generate · Review ·    │
│                  Explain · Refactor)  + "Copilot Chat compatible"    │
│                  Context chips: open files · branch · selection      │
├──────────────────────────────────────────────────────────────────────┤
│ 7 MCP & AGENT    left: MCP hub diagram (AI ↔ DB, API, browser, …)    │
│                  right: 1M context meter + local-agent diagram       │
│                  tool list: diagnostics · file search · dirs · …     │
│                  "Coming soon: Always Allow" card                    │
├──────────────────────────────────────────────────────────────────────┤
│ 8 RELIABILITY    6-tile grid + usage dashboard screenshot            │
├──────────────────────────────────────────────────────────────────────┤
│ 9 PRICING        Pay-as-you-go card | BYOK card                      │
│                  comparison table vs Cursor / Claude Code / Copilot  │
├──────────────────────────────────────────────────────────────────────┤
│ 10 FAQ           accordion, 8–10 questions                           │
├──────────────────────────────────────────────────────────────────────┤
│ 11 CTA           big headline + [Install for VS Code] + terminal     │
│                  snippet: ext install misterpilot.[id]               │
├──────────────────────────────────────────────────────────────────────┤
│ FOOTER  Product · Docs · Pricing · Privacy · Terms · Status · GitHub │
└──────────────────────────────────────────────────────────────────────┘
```

**Mobile:** hero stacks (copy → CTAs → animation, animation shortened to 1 loop of 3 rows). Comparison tables become horizontally-snapping cards, one competitor per card. Sticky bottom bar with `Install for VS Code` after scrolling past hero.

---

## 3. Section-by-Section Copy

### Nav

`Auto` · `Models` · `Features` · `Pricing` · `Docs` — right side: `Log in` (text) · **`Install for VS Code`** (primary)

Announcement bar (dismissible, above nav):
> ✦ **New:** MisterPilot Auto now routes every request to the best model automatically. **See how it works →**

---

### Section 1 — Hero

**Eyebrow pill:** `✦ New — MisterPilot Auto`

**H1:** Stop Choosing Models. Start Building.

**Subheadline:**
MisterPilot is the AI coding assistant for VS Code that picks the right model for every request — GPT, Claude, or DeepSeek — automatically. Faster answers on simple tasks, frontier reasoning on hard ones, and you only pay for what you use.

**Primary CTA:** `Install for VS Code` → Marketplace
**Secondary CTA:** `Create free account` → `/register`

**Trust row (under CTAs):**
✓ No subscription  ✓ Bring your own keys  ✓ Up to 1M-token context  ✓ Copilot Chat compatible

**Hero visual — routing animation (right side):** three prompts type in, one at a time, each line resolving to a routed model chip.

```
› "Why is this regex not matching?"          → ⚡ Fast model      ₹0.01
› "Add Google OAuth to the Express app"      → 🧠 Reasoning model ₹0.40
› "Split this monolith into services"        → ★ Frontier model   ₹2.10
                                   MisterPilot Auto · routed in [N] ms
```
(Costs are illustrative — replace with real medians from usage data or remove the column.)

**Alt hero headlines for A/B:**
- A: "Stop Choosing Models. Start Building." (control)
- B: "AI That Picks The Right AI."
- C: "One Request. The Best Model. Every Time."
- D (price-led, for paid-traffic landing): "Claude, GPT and DeepSeek in VS Code. No Subscription."

---

### Section 2 — Social Proof

**H2:** Trusted by developers shipping every day

**Stat strip (only real numbers):**
`[N]+ developers` · `[N]M+ requests routed` · `[N]B tokens processed` · `★ [x.x] on VS Code Marketplace`

**Testimonials (3 cards — collect real quotes; suggested prompts to ask users):**
- Ask a Copilot switcher: *"What changed when you stopped picking models?"*
- Ask a cost-conscious founder: *"How does your monthly spend compare to before?"*
- Ask a team lead: *"What made it production-ready for your team?"*

Card format: quote (≤ 25 words) · name · role · company · avatar. If we don't have 3 real quotes at launch, **ship the stat strip alone** — fake-looking testimonials hurt developer trust more than none.

---

### Section 3 — What Is MisterPilot Auto

**Eyebrow:** MisterPilot Auto
**H2:** AI That Picks The Right AI
**Intro:**
Every AI model has strengths. Some are fast and cheap. Some reason deeply. Some handle huge architectural changes. Instead of making you guess, MisterPilot Auto reads each request and sends it to the model best suited for the job.

**3-step flow:**

| ① You ask | ② Auto analyzes | ③ The right model answers |
|---|---|---|
| Type in chat, select code, or run a command — exactly like you do now. | Auto looks at the task's complexity, context size, and type of work. | Your request goes to the best-fit model. You see which model answered and what it cost. |

**Routing examples (visual table/cards):**

| Your request | What Auto picks | Why |
|---|---|---|
| "What does this function return?" | ⚡ Fast, low-cost model | Simple question — speed matters more than depth |
| "Implement pagination for this API" | 🧠 Strong reasoning model | Multi-file change with logic to get right |
| "Plan a migration from REST to GraphQL" | ★ Premium frontier model | Architectural decision — quality matters most |

**Microcopy under table:** Prefer a specific model? Pick it manually anytime. Auto is the default, never a lock.

---

### Section 4 — Why Auto Routing Is Better

**H2:** Stop Paying Frontier Prices for Simple Questions
**Sub:** Most coding requests don't need the most expensive model. Auto uses premium models only when they make a difference.

**4 benefit cards:**

1. **Better answers** — Hard problems get the strongest reasoning models, not whatever you last had selected.
2. **Lower costs** — Everyday questions run on fast, affordable models. Your wallet goes further.
3. **No model-switching** — No dropdowns, no second-guessing, no "should I have used Claude for this?"
4. **Fully automatic** — Works out of the box. Override any time if you want a specific model.

**Comparison table — Manual vs Auto:**

| | Picking models yourself | MisterPilot Auto |
|---|---|---|
| Model choice per request | You guess | Chosen from the task |
| Simple questions | Often sent to expensive models | Routed to fast, low-cost models |
| Complex tasks | Often sent to weak models | Routed to reasoning / frontier models |
| Keeping up with new models | You research releases | We update routing as models ship |
| Cost visibility | Check each provider's dashboard | Per-request model + cost in one dashboard |

**Proof callout (add once measured):** "Developers using Auto spent **[X]% less** per task than using a single frontier model for everything." — *only publish with an internal benchmark to back it.*

---

### Section 5 — Supported AI Models

**Eyebrow:** Models
**H2:** All Your AI Models. One Workspace.
**Sub:** OpenAI, Claude, and DeepSeek in one extension, one chat, one bill. No vendor lock-in — when a better model ships, you get it.

**Provider cards (logo + short line + example models):**

- **OpenAI** — Versatile, fast models for everyday coding. `[current GPT model names]`
- **Claude** — Careful reasoning and large-context code understanding. `[current Claude model names]`
- **DeepSeek** — Strong coding performance at a fraction of the cost. `deepseek-chat` · `deepseek-reasoner`

(Pull model names from the backend's model registry at build time so this never goes stale.)

**Benefits row:** No vendor lock-in · Latest models as they launch · One unified experience

**BYOK sub-block:**

**H3:** Use Your Own AI Keys
Already paying OpenAI, Anthropic, or DeepSeek? Connect your API keys and MisterPilot uses them directly — you're billed by the provider, at their rates.

- **Full control** — your keys, your provider accounts, your limits
- **Direct billing** — usage goes straight to your provider invoice
- **Use what you already have** — existing credits and enterprise agreements just work
- **Stored securely** — keys are encrypted and managed with AWS Secrets Manager

**Visual:** settings-panel mock with three provider rows, masked keys (`sk-••••••4f2a`), and a toggle: `Use MisterPilot credits` / `Use my key`.

**CTA:** `Connect your keys →`

---

### Section 6 — VS Code Experience

**Eyebrow:** VS Code
**H2:** The AI Coding Assistant That Lives in Your Editor
**Sub:** Install one extension. Keep your editor, your keybindings, and your workflow. MisterPilot works with the Copilot Chat interface you already know.

**Tabbed screenshot (each tab = real VS Code screenshot):**

| Tab | Caption |
|---|---|
| **Chat** | Ask anything about your code. Answers stream in real time. |
| **Generate** | Describe what you need; get working code in the right file. |
| **Review** | Catch bugs, edge cases, and style issues before you commit. |
| **Explain** | Understand unfamiliar code in plain English. |
| **Refactor** | Clean up, rename, and restructure with confidence. |

**Copilot compatibility callout:**
> **Already use Copilot Chat?** MisterPilot plugs into the same chat experience — no new UI to learn. Just more models, and smarter routing.

**Smart context sub-block — H3: Your AI Understands Your Workspace**
MisterPilot automatically picks up what you're working on, so you spend less time explaining.

Context chips (animated, lighting up one by one): `📄 Open files` `📁 Project structure` `🌿 Git branch: feature/auth` `✂️ Selected code` `🗂 Workspace layout`

Benefits: Less prompting · More accurate answers

---

### Section 7 — MCP & Agent Features

**Eyebrow:** Agent
**H2:** More Than Chat
**Sub:** MisterPilot doesn't just answer — it reads your project, uses tools, and works through multi-step tasks.

**Block A — H3: Connect AI To Everything**
With the Model Context Protocol (MCP), MisterPilot can talk to your databases, APIs, browsers, and internal services. Add a server, and your AI gains a new skill.
- Extensible workflows
- Plug-and-play tool integrations
- Built on an open standard — future-ready

*Visual:* hub diagram — MisterPilot in the center, spokes to `Postgres`, `GitHub`, `Browser`, `REST APIs`, `Your internal tools`.

**Block B — H3: Your Agent Runs Where Your Code Lives**
The MisterPilot agent runs inside VS Code, right next to your files — not on a remote server for every step.
- Faster responses — no round trip per action
- Better reliability — fewer moving parts
- More control — you see and approve what it does

*Visual:* two-lane diagram. Left "Typical cloud agent": editor → cloud → editor → cloud (many arrows). Right "MisterPilot": agent inside editor, one arrow to model.

**Block C — H3: Built For Large Codebases**
Up to **1 million tokens** of context. MisterPilot can hold large codebases and long conversations in view without losing the thread.
- Better whole-project awareness
- Less repeating yourself
- Long-running sessions that stay coherent

*Visual:* context meter — a bar filling from `8K` → `128K` → `200K` → `1M`, with labels "a file", "a module", "a service", "your whole repo". (Note in fine print: available context depends on the selected model.)

**Block D — Advanced coding tools (icon grid):**
| Tool | What it does |
|---|---|
| 🩺 Diagnostics awareness | Sees your errors and warnings, fixes what's actually broken |
| 🔍 File discovery | Finds the right files without you pointing at them |
| 📂 Directory browsing | Understands how your project is organized |
| 📜 Large file reading | Handles big files without truncating what matters |
| 🔁 Multi-step tool use | Chains searches, reads, and edits to finish real tasks |

**Block E — Coming soon card (dashed border, "Soon" badge):**
**H3:** Automation Without Losing Control
*Always Allow* lets you auto-approve safe operations — like reading files or running tests — while anything risky still asks first.
- Faster workflows
- Safety by default
CTA: `Get notified →` (email capture — doubles as a lead list for launch)

---

### Section 8 — Enterprise Reliability

**Eyebrow:** Reliability
**H2:** Built For Production
**Sub:** The boring parts, done right — so your AI assistant is there when you need it.

**6-tile grid:**
1. **Automatic fallbacks** — If a provider has an outage, requests reroute to a healthy model.
2. **Real-time streaming** — Responses appear as they're generated. No waiting for the full answer.
3. **Usage tracking** — Every request logged with model, tokens, and cost.
4. **Reliable billing** — Prepaid wallet, accurate per-token charges, full transaction history.
5. **Secure secrets** — API keys encrypted and stored in AWS Secrets Manager.
6. **Secure sign-in** — Google or email auth, managed API keys with instant revoke.

**Visual:** real screenshot of `/dashboard` (wallet balance, requests, tokens, spend, daily chart, recent activity table). **Update mockup data to show mixed models** (GPT, Claude, DeepSeek rows), not only DeepSeek — it reinforces the multi-provider story.

**Caption:** Your usage dashboard: see which model handled each request and exactly what it cost.

---

### Section 9 — Pricing (see §5 for strategy)

**Eyebrow:** Pricing
**H2:** Pay for Tokens, Not Subscriptions
**Sub:** No monthly fee. Recharge your wallet, or bring your own keys. Auto routing keeps every rupee working harder.

**Two cards side by side:**

**Card 1 — MisterPilot Credits** (highlighted, "Most popular")
- **₹0/month** — pay as you go
- Top up from ₹[min]
- All models: OpenAI, Claude, DeepSeek
- MisterPilot Auto routing
- Usage dashboard & per-request costs
- MCP, agent tools, up to 1M context
- CTA: `Start free` · microcopy: "No credit card required."

**Card 2 — Bring Your Own Key**
- **₹0/month** — [or: platform fee ₹X / free — confirm]
- Use your OpenAI / Anthropic / DeepSeek keys
- Billed directly by the provider
- Same extension, same Auto routing, same tools
- CTA: `Connect your keys`

Then the comparison table (§4 below) and a line: *"Teams: need invoicing, shared wallets, or volume pricing? [Talk to us →]"*

---

### Section 10 — FAQ

**H2:** Frequently Asked Questions

1. **What is MisterPilot Auto?**
   It's our automatic model router. For each request, Auto looks at what you're asking and sends it to the best-fit model — a fast, low-cost one for simple questions, a strong reasoning model for real implementation work, and a frontier model for big architectural tasks.

2. **Can I still choose a specific model?**
   Yes. Auto is the default, but you can pick any supported model manually at any time.

3. **Which AI providers are supported?**
   OpenAI, Anthropic (Claude), and DeepSeek. We add new models as they're released.

4. **Do I need a subscription?**
   No. Top up your wallet and pay only for the tokens you use — or bring your own API keys and pay your provider directly.

5. **How does Bring Your Own Key work? Are my keys safe?**
   Add your OpenAI, Anthropic, or DeepSeek key in settings. Keys are encrypted and stored with AWS Secrets Manager, and requests using your key are billed by your provider.

6. **Does it work with GitHub Copilot Chat?**
   Yes. MisterPilot is compatible with the Copilot Chat experience in VS Code, so you keep the interface you know and gain more models.

7. **What is MCP and why does it matter?**
   The Model Context Protocol is an open standard for connecting AI to tools — databases, APIs, browsers, internal services. With MCP support, you can extend what MisterPilot can do without waiting for us to build each integration.

8. **How much context can MisterPilot handle?**
   Up to 1 million tokens, depending on the model. That's enough for large codebases and long working sessions.

9. **What does "local agent execution" mean?**
   The agent that reads files, searches your project, and applies edits runs inside VS Code on your machine. Only the model calls go to the AI provider. That means fewer round trips and more control.

10. **How is this different from Cursor or Claude Code?**
    Cursor is a separate editor; Claude Code is tied to one model family. MisterPilot is a VS Code extension that works across OpenAI, Claude, and DeepSeek, picks the right model for you, and has no subscription.

11. **What happens if a provider goes down?**
    Auto falls back to another healthy model so you can keep working.

---

### Section 11 — Final CTA

**H2:** Your Next Commit Deserves the Right Model
**Sub:** Install MisterPilot in under a minute. No subscription, no model-juggling — just better code, faster.

**Primary:** `Install for VS Code`
**Secondary:** `Create free account`

Terminal snippet visual:
```
$ code --install-extension [publisher].misterpilot
✓ MisterPilot installed · Auto routing enabled
```

**Fine print:** Works with VS Code [min version]+. No credit card required.

---

## 4. CTA Copy Library

| Placement | Primary | Secondary | Microcopy |
|---|---|---|---|
| Nav | Install for VS Code | Log in | — |
| Hero | Install for VS Code | Create free account | No subscription · No credit card |
| After "What is Auto" | Try Auto free | — | Works in the editor you already use |
| Why Auto | See what you'd save | — | Links to pricing |
| Models / BYOK | Connect your keys | — | Takes 30 seconds |
| VS Code | Install the extension | Watch 60-sec demo | Copilot Chat compatible |
| MCP & Agent | Explore agent features | Read MCP docs | — |
| Always Allow (soon) | Get notified | — | One email when it ships. No spam. |
| Pricing | Start free | Connect your keys | No credit card required |
| Teams | Talk to us | — | Shared wallets & invoicing |
| Final CTA | Install for VS Code | Create free account | Up and running in under a minute |
| Mobile sticky bar | Install for VS Code | — | — |

Avoid: "Get Started" (vague), "Sign up" (friction-first), "Learn more" (passive).

---

## 5. Feature Comparison Tables

### Table A — MisterPilot vs alternatives (features)

> Verify every competitor cell against their current site before publishing; this category changes monthly. Use "—" not "✗" where unsure.

| | **MisterPilot** | Cursor | Claude Code | GitHub Copilot | Cline |
|---|---|---|---|---|---|
| Works inside VS Code | ✓ Extension | Separate editor (VS Code fork) | CLI + IDE extension | ✓ Extension | ✓ Extension |
| Automatic model routing | ✓ **MisterPilot Auto** | Partial (auto mode) — verify | — | Partial — verify | — |
| OpenAI models | ✓ | ✓ | — | ✓ | ✓ (BYOK) |
| Claude models | ✓ | ✓ | ✓ | ✓ | ✓ (BYOK) |
| DeepSeek models | ✓ | verify | — | — | ✓ (BYOK) |
| Bring your own key | ✓ | verify | API key | — | ✓ |
| No subscription required | ✓ Pay-as-you-go | Free tier + paid plans | Plan or API billing | Free tier + paid plans | ✓ (BYOK only) |
| Managed billing (no keys needed) | ✓ | ✓ | ✓ | ✓ | — |
| MCP support | ✓ | ✓ | ✓ | ✓ | ✓ |
| Up to 1M context | ✓ (model-dependent) | model-dependent | model-dependent | model-dependent | model-dependent |
| Per-request cost dashboard | ✓ | verify | verify | — | ✓ (token counter) |
| Copilot Chat compatible | ✓ | — | — | native | — |

**Positioning takeaway for the table's caption:**
*Cline gives you keys but no managed billing. Copilot gives you billing but no key control. Cursor makes you switch editors. MisterPilot gives you both — plus Auto.*

### Table B — Existing features (keep visible, for a compact "Everything included" grid)

| Coding | Platform | Control |
|---|---|---|
| AI chat | Cloud-hosted platform | API key management |
| Code generation | Authentication (Google / email) | Wallet system |
| Code review | Streaming responses | Usage dashboard |
| Code explanation | Automatic fallbacks | BYOK |
| Refactoring | AWS secrets management | Manual model override |
| Copilot Chat compatible | MCP support | Always Allow (soon) |

---

## 6. Pricing Presentation Recommendations

1. **Lead with "no subscription," then prove it.** The existing "₹0/month" hook is good — keep it, but pair it with an *example monthly cost* so ₹0 doesn't read as "hidden costs later." E.g. "Typical solo developer: ₹[X]/month" (use real median wallet spend).
2. **Show a cost estimator, not just a card.** Slider: "Requests per day: [50]" × "Mix: mostly simple / balanced / mostly complex" → estimated monthly cost with Auto vs with a single frontier model. This turns Auto's value into a number.
3. **Anchor against competitors in the visitor's currency.** Target audience includes India-based devs paying USD subscriptions. Show competitor prices converted to ₹ ("Cursor Pro ≈ ₹[X]/mo") — verify prices on the day of publishing.
   - Current list prices to verify: Cursor Pro, Claude Pro/Max (for Claude Code), GitHub Copilot Pro/Pro+.
4. **Two cards, not three.** Credits vs BYOK is a clean, honest choice. A third "Team" tier should be a text link ("Talk to us") until team features (shared wallets, seats) exist.
5. **Publish a per-model rate table** (collapsed by default: "See per-model token prices"). Developers comparing against API list prices will look for it; hiding it signals markup.
6. **Offer starter credit** if margins allow ("₹[X] free credit on sign-up") — the single biggest lever for a pay-as-you-go funnel, because it removes the payment step from first use.
7. **Currency switcher** (₹ / $) if targeting global traffic; default by geo.
8. **Risk reversal microcopy:** "Unused balance never expires." (confirm policy) · "Revoke keys and stop billing any time."

---

## 7. Visual Component Suggestions

| Component | Section | Build notes |
|---|---|---|
| **Routing animation** | Hero | Pure CSS/React: prompts type in (typewriter), a line draws to a model chip, chip glows in its tier color. Loop 3 prompts, pause on hover. Respect `prefers-reduced-motion` (show static final state). |
| **Auto flowchart** | What Is Auto | Horizontal 3-node SVG: `Request → Router (◆ logo) → [Fast · Reasoning · Frontier]`. Active branch highlights on scroll into view. |
| **Provider logo cards** | Models | Monochrome logos, colorize on hover. Use official brand assets per each provider's usage guidelines. |
| **BYOK settings mock** | Models | Real UI component with masked keys and a toggle. Reuse dashboard's API-keys table styles. |
| **Tabbed VS Code screenshots** | VS Code | Real screenshots at 2x, dark theme, cropped to the chat panel + editor. Auto-advance tabs every 5s. Short looping video (MP4/WebM, < 1.5 MB each) outperforms static images here. |
| **Context chips** | VS Code | Pill badges that light up in sequence, each with an icon. |
| **MCP hub diagram** | MCP & Agent | SVG radial: center node, 5–6 spokes, dots traveling along spokes. |
| **Local vs cloud agent lanes** | MCP & Agent | Two-column animated arrows; the cloud lane has many round trips, ours has one. |
| **Context meter** | MCP & Agent | Segmented progress bar with labeled stops (file → module → service → repo at 1M). Fill animates on scroll. |
| **Tool icon grid** | MCP & Agent | 5 tiles, lucide-react icons (already a dependency): `Stethoscope`, `Search`, `FolderTree`, `FileText`, `Workflow`. |
| **"Soon" card** | MCP & Agent | Dashed border, muted colors, gold "Soon" badge, inline email input. |
| **Dashboard screenshot** | Reliability | Real `/dashboard` with seeded multi-provider data. |
| **Comparison table** | Pricing | Sticky first column; MisterPilot column tinted green; mobile → swipeable cards. |
| **Cost estimator** | Pricing | Two inputs, one output; show "with Auto" vs "single frontier model". |

**Visual system:**
- Keep the existing brand: dark background, green `#35AA35` primary, gold accent, radial glows, Inter + JetBrains Mono (already loaded in `layout.tsx`).
- Assign **tier colors** used consistently everywhere Auto appears: ⚡ Fast = green, 🧠 Reasoning = blue/indigo, ★ Frontier = gold.
- Monospace for anything that represents code, model IDs, tokens, or costs — it reads as "real" to developers.
- One animation per viewport max. Cursor/Linear-style restraint: subtle, purposeful motion.

---

## 8. Conversion Optimization Recommendations

**Above the fold**
1. **Primary CTA = install**, not register. Measure Marketplace click-through as the north-star top-of-funnel metric; register/wallet top-up as activation.
2. The hero must answer in 5 seconds: *what it is* (VS Code AI assistant), *what's different* (auto-picks the model), *why cheaper* (no subscription). The subheadline above covers all three — keep it.
3. Put the trust row (no subscription · BYOK · 1M context · Copilot compatible) directly under the CTAs; these are the top four objection-killers.

**Trust**
4. Real numbers only. An honest "[N] developers" beats an inflated one; developers check.
5. Show the product, not illustrations: real VS Code captures, real dashboard. Include model name + cost on every example response.
6. Add a public status page link and a changelog link in the footer — cheap, high-trust signals for "Built For Production."

**Friction**
7. Offer Google sign-in as the first register option (already exists) and consider starter credit to skip the payment step before the first "aha."
8. After install, the extension's first-run should route one real request and show *"Answered by [model] via Auto · cost ₹0.0x"* — this is the aha moment; landing-page promise → in-product proof.

**Segmented landing pages**
9. Clone the homepage with swapped H1 + comparison emphasis for paid/SEO traffic:
   - `/vs/cursor` — "Cursor features. No new editor. No subscription."
   - `/vs/claude-code` — "Claude, plus GPT and DeepSeek, in VS Code."
   - `/for/copilot-users` — "Keep Copilot Chat. Get every model."

**Lead capture**
10. "Always Allow — Get notified" doubles as an email list. Add a lightweight "Get the changelog" capture in the footer.

**Experiments (in priority order)**
| # | Test | Hypothesis | Metric |
|---|---|---|---|
| 1 | Hero H1 A vs D (outcome vs price) | Price-led wins for paid traffic, outcome-led for organic | Install CTR |
| 2 | Primary CTA install vs register | Install converts higher for an extension | Activated users / visitor |
| 3 | Pricing with vs without cost estimator | Estimator increases top-ups | Wallet top-up rate |
| 4 | Starter credit ₹[X] vs none | Removes payment barrier | Day-7 active users |
| 5 | Routing animation vs static diagram | Motion improves comprehension of Auto | Scroll depth to §4 |

**Instrumentation:** track `hero_install_click`, `hero_register_click`, `pricing_view`, `estimator_used`, `faq_open:{id}`, `byok_cta_click`, `notify_always_allow`. Add UTM passthrough to the Marketplace link.

**Performance (conversion lever too):** LCP < 2.0s — lazy-load screenshots/videos below the fold, keep the hero animation CSS-only, no heavy animation libraries.

---

## 9. Implementation Notes (for this repo)

- Next.js **14.2** App Router, Tailwind 3, lucide-react — no new dependencies needed for any component above.
- Per `AGENTS.md`, check `node_modules/next/dist/docs/` before touching metadata / routing APIs.
- Suggested new/renamed components in `src/components/landing/`:
  `AnnouncementBar`, `HeroSection` (rebuild), `SocialProofSection` (from `TestimonialsSection`), `AutoSection`, `WhyAutoSection` (from `WhySection`), `ModelsSection`, `VSCodeSection` (from `DevExperienceSection`), `AgentSection`, `ReliabilitySection` (from `AnalyticsSection`), `PricingSection` (rebuild), `ComparisonTable`, `FAQSection`, `CTASection` (rewrite).
- Update `HeroSection` dashboard mock data to include GPT/Claude rows (currently all `deepseek-*`).

## 10. Pre-launch checklist — fill every placeholder

- [ ] Marketplace URL + extension ID
- [ ] Real stats (users, requests, tokens, rating)
- [ ] 3 real testimonials (or drop the carousel)
- [ ] Current model names per provider (ideally pulled from the backend)
- [ ] Minimum top-up, starter credit, BYOK platform fee (if any), balance-expiry policy
- [ ] Competitor pricing & feature cells verified on publish date
- [ ] Auto savings benchmark (or remove the [X]% claim)
- [ ] Provider logo usage permissions
- [ ] Confirm "fallbacks," "AWS Secrets Manager," and "1M context" wording matches what's live in the backend
- [ ] OG image (1200×630)
