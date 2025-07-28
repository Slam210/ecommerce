# 🛒 Multi-Vendor E-Commerce Platform

A full-stack **Multi-Vendor E-Commerce Platform** built with the latest tools in modern web development: **Next.js 15**, **React**, **tRPC**, **Stripe Connect**, **Payload CMS**, and **MongoDB**. Each creator gets their own branded storefront and can sell digital products directly to users. Platform fees are automatically managed, and users can build a personal library of purchases.

Live deployment powered by **Vercel**.

---

## Tech Stack

- **Frontend**: Next.js 15, React, TailwindCSS v4, ShadcnUI
- **Backend**: tRPC, Payload CMS (MongoDB)
- **Payments**: Stripe Connect (OAuth + automatic fee split)
- **Deployment**: Vercel
- **Database**: MongoDB (via Mongoose adapter)

---

## Key Features

### Multi-Tenant Functionality

- Creators get isolated environments under their own **subdomains**.
- Each vendor has a **custom storefront** to sell digital goods.

### Payments & Monetization

- Integrated with **Stripe Connect** for secure vendor payouts.
- **Automatic platform fees** deducted on each transaction.

### Storefront & Buyer Experience

- Digital product purchases delivered instantly.
- **User library** of owned products.
- **Ratings and reviews** for products.
- **Category filtering** and **search** support.
- Secure file delivery and **image upload support**.

### Admin & Vendor Tools

- **Role-based access control** (RBAC) system.
- **Admin dashboard** to manage users, content, and payouts.
- **Merchant dashboard** to manage products, sales, and storefront settings.

---

## Architecture Overview

- **Frontend**: All user and admin views built in Next.js using server components and client hydration where needed.
- **Payload CMS**: Handles all content and product data with custom access control and media privacy settings.
- **tRPC**: Handles API communication in a fully type-safe manner.
- **Stripe**: Manages vendor onboarding, customer checkout, and payment splits.

---

## Project Highlights

| Feature                 | Description                                |
| ----------------------- | ------------------------------------------ |
| Subdomain Routing       | Each merchant lives on their own subdomain |
| Digital Product Support | Secure delivery of files after payment     |
| Reviews                 | Buyers can rate and review products        |
| Dashboards              | Separate dashboards for admins and vendors |
| Media Upload            | Vendors can upload product images securely |
| Search & Filters        | Easy navigation of product catalog         |

---

Open [http://localhost:3000](http://localhost:3000)

# 🌐 Wildcard Subdomain Routing Setup

Configure wildcard subdomain routing for your application using Vercel and custom domains.

---

## Steps

### 1. Purchase a Domain

Buy a custom domain from a domain provider (e.g., Namecheap, GoDaddy).

---

### 2. Add Domain to Vercel (Twice)

Go to your Vercel project dashboard:

- Add your base domain (e.g., `example.com`)
- Add the wildcard version: `*.example.com`

---

### 3. Edit for Wildcard Subdomain

Make sure one of the entries contains the wildcard:

```
*.example.com
```

---

### 4. Enable Subdomain Routing

Set an environment variable to allow routing based on subdomains.

---

### 5. Update Stripe Webhook URL

Point your Stripe webhook to the new subdomain-aware endpoint:

---

### 6. Redeploy the Project

Push changes and trigger a new deployment on Vercel.

---

## Future Improvements

- **Email Notifications**: Automate purchase confirmations, payout alerts, and admin notifications.
- **End-to-End Testing**: Add comprehensive automated tests to ensure platform stability.
- **In-app Messaging**: Facilitate direct communication between vendors and customers.
- **Internationalization**: Add multi-language and multi-currency support to reach a global audience.
- **Private Media**: Enable media to become privated to the tenant.
- **Repurchasing**: Enable users to repurchase products.
- **Shopping Cart**: Enable multi-shop carts with the addition of a buy later section.
