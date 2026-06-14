# MisterPilot Platform

## Overview

MisterPilot is a developer-first AI platform that provides access to multiple LLM providers through a single API.

Users can:

* Sign in with Google or Email
* Manage their wallet balance
* Create and manage API keys
* Monitor token usage and spending
* Access multiple AI models through a unified endpoint

---

# Design Principles

* Minimalistic
* Developer-focused
* Fast and responsive
* Dark mode first
* Modern SaaS design
* No unnecessary animations
* Clean typography
* Generous spacing
* Mobile-friendly

Inspired by:

* Stripe
* Vercel
* Linear
* GitHub

---

# Theme

## Colors

Primary:

* Indigo / Purple

Background:

* Dark Gray (#0F1117)

Cards:

* Slightly lighter background

Success:

* Green

Warning:

* Orange

Error:

* Red

---

# Authentication

## Login

### Header

MisterPilot Logo

Heading:
Welcome Back

Subheading:
Access all AI models through a single API.

### Options

Primary CTA:
Continue with Google

Divider:
OR

Fields:

* Email
* Password

Button:
Login

Links:

* Forgot Password
* Create Account

---

## Register

### Header

MisterPilot Logo

Heading:
Create Your Account

Subheading:
Start building with AI in minutes.

### Options

Primary CTA:
Continue with Google

Divider:
OR

Fields:

* Full Name
* Email
* Password
* Confirm Password

Button:
Create Account

Link:
Already have an account?

---

# Dashboard

## Overview Cards

Display four primary metrics.

### Card 1

Wallet Balance

Example:
₹2,350.00

### Card 2

API Requests

Example:
125,450

### Card 3

Tokens Consumed

Example:
15.2M

### Card 4

Amount Spent

Example:
₹1,125.40

---

## Usage Analytics

Display:

* Daily Requests Chart
* Daily Cost Chart

Simple line charts.

---

## Recent Activity

Table Columns:

* Timestamp
* Model
* Tokens
* Cost
* Status

---

# Wallet

## Wallet Summary

Display:

* Current Balance
* Total Recharge
* Total Consumption

---

## Actions

Primary Button:
Add Funds

Secondary Button:
View Transactions

---

## Transactions

Table Columns:

* Date
* Transaction ID
* Type
* Amount
* Payment Method
* Status

---

# API Keys

## Overview

Developers can manage API keys used to access MisterPilot APIs.

---

## Header Actions

Primary Button:
Create API Key

---

## API Key Table

Columns:

* Key Name
* API Key (Masked)
* Created At
* Last Used
* Status
* Actions

Actions:

* Copy
* Regenerate
* Revoke

---

## Create API Key Dialog

Fields:

* Key Name
* Expiry Date (Optional)

Button:
Generate API Key

After creation:

Show generated key once.

Display warning:

Save this key securely. You won't be able to view it again.

---

# Profile

## Account Information

Display:

* Profile Picture
* Full Name
* Email
* Account Created Date

---

## Security

Actions:

* Change Password
* Connected Google Account
* Active Sessions

---

## Danger Zone

Actions:

* Delete Account

---

# Navigation

## Sidebar

* Dashboard
* Wallet
* API Keys
* Profile
* Logout

---

# Top Navigation

Left:

* Page Title

Right:

* Notifications
* User Avatar

---

# Responsive Design

Desktop:

* Permanent Sidebar

Tablet:

* Collapsible Sidebar

Mobile:

* Hamburger Menu
* Drawer Navigation

---

# Empty States

Use friendly developer-focused messages.

Examples:

No API Keys Yet

Create your first API key to start making requests.

Button:
Create API Key

---

No Transactions Yet

Add funds to your wallet to begin using AI models.

Button:
Add Funds

---

# User Experience

Prioritize these user actions:

1. Sign In
2. Add Funds
3. Generate API Key
4. Make API Calls
5. Monitor Usage

Everything else should remain secondary.

The interface should feel fast, professional, and trustworthy for developers building AI-powered applications.
