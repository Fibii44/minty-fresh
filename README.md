# MintyFresh Cleaning

A premium cleaning service booking platform built with **Laravel 12**, **Inertia.js**, and **React**. Customers can get an instant price estimate, choose add-ons, schedule their appointment, and pay securely via **Stripe** — all in one seamless multi-step wizard.

---

## Features

- **Multi-step Booking Wizard** — Service selection, add-ons, scheduling, and payment in 4 guided steps
- **Real-time Price Calculator** — Total updates instantly based on service type, rooms, add-ons, and frequency discount
- **Stripe Payments** — Secure card payments via Stripe Elements (PCI-compliant)
- **Location Autocomplete** — Philippine city/province/zip code search with instant dropdown
- **Booking Confirmation Email** — Automatic confirmation email sent to the customer after booking
- **Admin Dashboard** — Manage bookings, assign cleaners, and update statuses
- **Cleaner Preference** — Customers can request a specific cleaner from the active roster
- **Fully Responsive** — Works on mobile, tablet, and desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 12 (PHP 8.2) |
| Frontend | React 18 + Inertia.js |
| Styling | Vanilla CSS (custom design system) |
| Database | PostgreSQL (via Supabase) |
| Payments | Stripe (Elements + Charges API) |
| Email | Laravel Mailable + Markdown templates |
| Build Tool | Vite |

---

## Getting Started

### Requirements

- PHP 8.2+
- Composer
- Node.js 18+
- PostgreSQL database

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Fibii44/minty-fresh.git
cd minty-fresh

# 2. Install PHP dependencies
composer install

# 3. Install JS dependencies
npm install

# 4. Copy and configure environment
cp .env.example .env
php artisan key:generate
```

### Environment Configuration

Open `.env` and fill in your credentials:

```env
# Database (PostgreSQL / Supabase)
DB_CONNECTION=pgsql
DB_HOST=your-db-host
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=your-username
DB_PASSWORD=your-password

# Stripe (get keys from dashboard.stripe.com/test/apikeys)
STRIPE_KEY=pk_test_...
STRIPE_SECRET=sk_test_...

# Mail (use Mailtrap for testing: mailtrap.io)
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your-mailtrap-username
MAIL_PASSWORD=your-mailtrap-password
MAIL_FROM_ADDRESS="hello@mintyfresh.com"
MAIL_FROM_NAME="MintyFresh Cleaning"
```

### Run Migrations & Seeders

```bash
php artisan migrate
php artisan db:seed  # Seeds sample cleaners
```

### Start Development Servers

```bash
# Terminal 1 — Laravel
php artisan serve

# Terminal 2 — Vite (React)
npm run dev
```

Visit **http://localhost:8000**

---

## Testing Stripe Payments

The app is configured for Stripe Test Mode by default. Use these test card numbers on the booking form:

| Card Number | Result |
|---|---|
| `4242 4242 4242 4242` | Payment succeeds |
| `4000 0000 0000 0002` | Card declined |
| `4000 0025 0000 3155` | Requires 3D Secure |

Use any future expiry date, any 3-digit CVC, and any 5-digit ZIP.

---

## Project Structure

```
app/
├── Http/Controllers/
│   ├── BookingController.php   # Handles booking form + Stripe charge
│   └── DashboardController.php # Admin dashboard data
├── Mail/
│   └── BookingConfirmationMail.php
├── Models/
│   ├── Booking.php
│   ├── Cleaner.php
│   └── User.php

resources/
├── js/
│   ├── Components/Welcome/
│   │   └── PricingWizard.jsx   # Main 4-step booking wizard
│   └── Pages/
│       ├── Book.jsx            # Stripe Elements wrapper
│       ├── BookingConfirmed.jsx
│       ├── Dashboard.jsx       # Admin panel
│       └── Welcome.jsx         # Landing page
├── views/emails/
│   └── booking-confirmation.blade.php

routes/
└── web.php
```

---

## Going Live (Production)

1. Complete Stripe account onboarding at [dashboard.stripe.com](https://dashboard.stripe.com)
2. Switch `.env` keys from `pk_test_` / `sk_test_` to `pk_live_` / `sk_live_`
3. Configure a production mail provider (e.g. Resend, SendGrid, Postmark)
4. Run `npm run build` to generate optimized assets
5. Set `APP_ENV=production` and `APP_DEBUG=false`

---

## License

This project is proprietary software built for a private client. All rights reserved.
