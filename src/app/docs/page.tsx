"use client";

import Link from "next/link";
import { useState } from "react";

/* ─── code snippets ─────────────────────────────────────────────────── */

const PIP = `pip install openai`;

const PYTHON_BASIC = `from openai import OpenAI

client = OpenAI(
    base_url="https://misterpilot.online/v1",
    api_key="sk-your-misterpilot-api-key",
)

response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain quantum computing in one paragraph."},
    ],
    temperature=0.7,
    max_tokens=1024,
)

print(response.choices[0].message.content)`;

const PYTHON_STREAM = `from openai import OpenAI

client = OpenAI(
    base_url="https://misterpilot.online/v1",
    api_key="sk-your-misterpilot-api-key",
)

stream = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[{"role": "user", "content": "Write a haiku about coding."}],
    stream=True,
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)`;

const CURL_BASIC = `curl https://misterpilot.online/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk-your-misterpilot-api-key" \\
  -d '{
    "model": "deepseek-v4-pro",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "What is the capital of France?"}
    ],
    "temperature": 0.7,
    "max_tokens": 256
  }'`;

const CURL_STREAM = `curl https://misterpilot.online/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk-your-misterpilot-api-key" \\
  -d '{
    "model": "deepseek-v4-pro",
    "messages": [
      {"role": "user", "content": "Count from 1 to 20, one number per line."}
    ],
    "stream": true
  }'`;

const PII_EXAMPLE = `# This message:
{ "role": "user", "content": "My email is alice@company.com, call me at +1-555-123-4567" }

# Becomes this before reaching the LLM:
{ "role": "user", "content": "My email is [EMAIL_0], call me at [PHONE_0]" }`;

/* ─── components ─────────────────────────────────────────────────────── */

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div style={{ background: "#0a0a0a", border: "1px solid #1e1e1e", borderRadius: 10, overflow: "hidden", marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", borderBottom: "1px solid #1e1e1e", background: "#141414" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.05em" }}>{lang}</span>
        <button
          onClick={copy}
          style={{
            fontSize: "0.75rem",
            color: copied ? "#7fff6e" : "#888",
            background: "none",
            border: `1px solid ${copied ? "#7fff6e" : "#222"}`,
            padding: "4px 10px",
            borderRadius: 5,
            cursor: "pointer",
            transition: "color 0.2s, border-color 0.2s",
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre style={{ margin: 0, padding: 16, overflowX: "auto", fontFamily: "var(--font-geist-mono), 'JetBrains Mono', monospace", fontSize: "0.82rem", lineHeight: 1.7, color: "#d4d4d4", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function SpecBlock({ rows, cols = "140px 1fr" }: { rows: [React.ReactNode, React.ReactNode][]; cols?: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: cols, gap: "4px 0", background: "#141414", border: "1px solid #222", borderRadius: 10, padding: "20px 24px", marginBottom: 12, fontSize: "0.85rem" }}>
      {rows.map(([label, value], i) => (
        <>
          <span key={`l${i}`} style={{ color: "#888", fontWeight: 500 }}>{label}</span>
          <span key={`v${i}`} style={{ fontFamily: "var(--font-geist-mono), monospace", color: "#e8e8e8" }}>{value}</span>
        </>
      ))}
    </div>
  );
}

function Tag({ children }: { children: string }) {
  return (
    <span style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase" as const, padding: "2px 8px", borderRadius: 4, background: "rgba(127,255,110,0.12)", color: "#7fff6e", letterSpacing: "0.04em" }}>
      {children}
    </span>
  );
}

/* ─── page ───────────────────────────────────────────────────────────── */

export default function DocsPage() {
  return (
    <div style={{ background: "#0d0d0d", color: "#e8e8e8", fontFamily: "var(--font-geist-sans), Inter, system-ui, sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>

      {/* nav */}
      <nav style={{ width: "100%", maxWidth: 900, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 32px" }}>
        <Link href="/" style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#e8e8e8", textDecoration: "none" }}>
          Mister<span style={{ color: "#7fff6e" }}>Pilot</span>
        </Link>
        <Link
          href="/dashboard"
          style={{ fontSize: "0.85rem", color: "#888", textDecoration: "none", border: "1px solid #222", padding: "6px 14px", borderRadius: 6 }}
        >
          Dashboard →
        </Link>
      </nav>

      {/* main */}
      <main style={{ width: "100%", maxWidth: 900, padding: "40px 32px 100px" }}>

        {/* hero */}
        <div style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#7fff6e", background: "rgba(127,255,110,0.12)", border: "1px solid rgba(127,255,110,0.25)", padding: "4px 12px", borderRadius: 999, marginBottom: 20 }}>
          OpenAI Compatible
        </div>
        <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 12 }}>
          Use MisterPilot <em style={{ fontStyle: "normal", color: "#7fff6e" }}>as a drop-in</em> OpenAI replacement
        </h1>
        <p style={{ fontSize: "1rem", color: "#888", marginBottom: 48, lineHeight: 1.6 }}>
          Point any OpenAI SDK at{" "}
          <code style={{ color: "#7fff6e", background: "rgba(127,255,110,0.12)", padding: "2px 6px", borderRadius: 3 }}>
            https://misterpilot.online/v1
          </code>
          {" "}— your API key, any model supported by DeepSeek.
        </p>

        {/* 1. Python */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
            1. <Tag>Python</Tag> OpenAI SDK
          </h2>
          <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: 16, lineHeight: 1.6 }}>
            Install the OpenAI package and swap <code style={{ color: "#e8e8e8" }}>base_url</code> — that&apos;s it.
          </p>
          <CodeBlock lang="pip install" code={PIP} />
          <CodeBlock lang="python — non-streaming" code={PYTHON_BASIC} />
          <CodeBlock lang="python — streaming (smooth token-by-token)" code={PYTHON_STREAM} />
        </section>

        {/* 2. cURL */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
            2. <Tag>cURL</Tag> Direct HTTP
          </h2>
          <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: 16, lineHeight: 1.6 }}>
            Call the API directly from the terminal with zero dependencies.
          </p>
          <SpecBlock rows={[
            ["Method", <span key="m" style={{ display: "inline-block", padding: "1px 6px", borderRadius: 3, fontSize: "0.75rem", fontWeight: 700, marginRight: 4, background: "rgba(100,180,255,0.15)", color: "#64b4ff" }}>POST</span>],
            ["Endpoint", <span key="e" style={{ color: "#7fff6e" }}>/v1/chat/completions</span>],
            ["Content-Type", "application/json"],
            ["Auth", "Authorization: Bearer <key>"],
          ]} />
          <CodeBlock lang="cURL — non-streaming" code={CURL_BASIC} />
          <CodeBlock lang="cURL — streaming (SSE)" code={CURL_STREAM} />
        </section>

        {/* 3. API Key Resolution */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
            3. API Key <Tag>Resolution</Tag>
          </h2>
          <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: 16, lineHeight: 1.6 }}>
            Your key is resolved in this priority order. You only need to provide it <em>one</em> way.
          </p>
          <SpecBlock cols="80px 1fr" rows={[
            [<span key="1" style={{ color: "#7fff6e", fontWeight: 700 }}>#1</span>, <code key="1v">Authorization: Bearer &lt;key&gt; header</code>],
            ["#2", <code key="2v">&quot;apikey&quot; field in the JSON body</code>],
            ["#3", <span key="3v">Default from <code style={{ color: "#7fff6e" }}>config.yaml</code></span>],
          ]} />
        </section>

        {/* 4. PII Redaction */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
            4. Built-in PII <Tag>Protection</Tag>
          </h2>
          <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: 16, lineHeight: 1.6 }}>
            Every user message is automatically scanned and redacted before it reaches the LLM.
            Emails, phone numbers, IP addresses, credit card numbers, SSNs, and more are
            replaced with placeholders — no configuration required.
          </p>
          <CodeBlock lang="example — automatically redacted" code={PII_EXAMPLE} />
        </section>

        {/* 5. Supported Models */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
            5. Supported <Tag>Models</Tag>
          </h2>
          <SpecBlock rows={[
            ["Default", <span key="d" style={{ color: "#7fff6e" }}>deepseek-v4-pro</span>],
            ["Also available", "deepseek-v4-flash (any model your DeepSeek API key grants access to)"],
          ]} />
        </section>

      </main>
    </div>
  );
}
