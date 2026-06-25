# 💊 Cherry Pharmacy Management System

> A modern, multi-tenant pharmacy management SaaS platform built for independent pharmacies worldwide.

**Live demo:** [melodic-beijinho-39b9e2.netlify.app](https://melodic-beijinho-39b9e2.netlify.app)

---

## What is Cherry?

Cherry is a cloud-based pharmacy management system that gives independent pharmacies everything they need to run their daily operations — from inventory and billing to staff shifts and purchase orders — in a single, fast, mobile-friendly interface.

It is built as a multi-tenant SaaS platform, meaning a single deployment serves multiple pharmacy clients, each with their own isolated data, branches, and staff accounts.

---

## Features

### 🧾 Point-of-Sale Billing
- Fast drug search and cart-based checkout
- Receipt generation with print support
- GST/tax calculation per drug
- **Offline-first** — sales are saved locally during outages and auto-sync when connectivity returns

### 💊 Inventory Management
- Full drug catalog with batch tracking, expiry dates, and reorder thresholds
- Pictorial card and table views
- Barcode scanning via BarcodeDetector API
- Drug interaction warnings at checkout
- Prescription audit trail

### 📦 Purchase Orders
- Create and track orders per supplier
- Link delivered stock directly to inventory

### ↩ Returns & Refunds
- Process returns against completed sales
- Optional automatic restock on return

### 🔁 Cross-Branch Stock Transfers
- Request and fulfill stock transfers between branches
- Full transfer history and status tracking

### 📊 Reports & Analytics
- Revenue trends, gross margin, peak hours
- Expiry intelligence and slow-moving stock detection
- Reorder prediction
- CSV export

### 🏢 Multi-Branch Owner Dashboard
- Consolidated revenue, stock value, and shrinkage across all branches
- Top-selling drugs org-wide

### 🗓️ Staff Shift Scheduling
- Assign shifts to staff by branch and date

### 🔔 Smart Alerts
- Low stock, out-of-stock, and expiring drug alerts in real time

### 🔒 Security
- Role-based access: `super_admin`, `org_admin`, `pharmacist`
- Row-Level Security (RLS) enforced at the database level — each client's data is fully isolated
- Optional Two-Factor Authentication (TOTP)
- Cloudflare Turnstile bot protection on login
- Auto session timeout after 10 minutes of inactivity

### ⚙️ Platform Admin (Super Admin only)
- View and manage all pharmacy clients from one dashboard
- One-click client onboarding (creates org, branch, subscription, and admin account)
- Subscription management: mark paid, edit plan/pricing, suspend

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Single-file React (no build step), vanilla `React.createElement` |
| Backend | Supabase (PostgreSQL + Auth + Realtime) |
| Hosting | Netlify / GitHub Pages / Cloudflare Pages |
| Auth | Supabase Auth + Cloudflare Turnstile captcha |
| Offline | localStorage queue with auto-sync |
| Security | Supabase RLS policies, SECURITY DEFINER RPCs |

---

## Pricing & Licensing

Cherry is a **commercial SaaS product**. It is not open source.

This repository showcases the platform for prospective pharmacy clients and partners. The source code is proprietary.

**Interested in deploying Cherry for your pharmacy?**
Contact: [your contact details here]

### Plans
| Plan | Features |
|---|---|
| Standard | Single branch, full feature set |
| Pro | Multi-branch, consolidated dashboard, transfers |
| Enterprise | Custom pricing, dedicated support |

---

## Screenshots

> *Coming soon*

---

## Legal

- [Terms of Service](https://melodic-beijinho-39b9e2.netlify.app/legal)
- [Privacy Policy](https://melodic-beijinho-39b9e2.netlify.app/legal)

---

## About the Developer

Built by **Tanaka Calton Manyama** — a Zimbabwean final-year BPharm student and health-tech entrepreneur based in India at the moment.

Cherry is designed with the realities of pharmacy operations in emerging markets in mind: offline-first, mobile-friendly, and deployable without expensive infrastructure.

---

*© 2026 Cherry Pharmacy Management System. All rights reserved.*
