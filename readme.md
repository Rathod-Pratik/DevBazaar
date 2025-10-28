
**Frontend Live:** https://dev-bazaar.vercel.app/

# DevBazaar – E-Commerce Platform

DevBazaar is a full-stack e-commerce web application with a modern React + Vite frontend and a Node.js/Express/MongoDB backend. It supports user and admin roles, product management, cart, wishlist, order processing, payment integration (Razorpay), reviews, and more.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

### User
- Browse products by category
- Product search and filtering
- Add to cart, wishlist, and checkout
- Place orders and view order history
- Leave product reviews
- User authentication (signup/login)
- Profile management
- Contact support

### Admin
- Dashboard with stats (revenue, users, orders)
- Manage products, categories, users, reviews, and orders
- View and delete contacts/messages

### General
- Responsive UI (React, Tailwind CSS)
- Payment integration (Razorpay)
- Email notifications (via nodemailer)
- Cloudinary for image uploads

---

## Tech Stack

**Frontend:**
- React 18 (with Vite)
- React Router DOM
- Zustand (state management)
- Tailwind CSS
- AOS (animations)
- React Toastify, Swiper, React Icons

**Backend:**
- Node.js, Express.js
- MongoDB (Mongoose)
- JWT authentication
- Razorpay (payments)
- Cloudinary (image uploads)
- Nodemailer (emails)
- Express Validator, bcryptjs

---

## Project Structure

```
DevBazaar/
│
├── app/                # Frontend (React + Vite)
│   ├── src/
│   │   ├── Component/  # Reusable UI components
│   │   ├── Pages/      # Page-level components (Home, Cart, Admin, etc.)
│   │   ├── Store/      # Zustand stores
│   │   ├── Utils/      # Utility functions/constants
│   │   └── lib/        # API client
│   ├── public/         # Static assets (images, icons)
│   ├── index.html
│   ├── package.json
│   └── tailwind.config.js
│
├── Backend/            # Backend (Node.js/Express)
│   ├── api/            # Express app entry
│   ├── controller/     # Route controllers (Auth, Product, Order, etc.)
│   ├── middleware/     # Auth, file, and error middleware
│   ├── model/          # Mongoose models
│   ├── routes/         # Express routes
│   ├── public/         # Uploaded files (if any)
│   ├── server.js       # Server entry point
│   └── package.json
│
├── readme.md           # Project documentation (this file)
└── ...
```


## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- Cloudinary account (for images)
- Razorpay account (for payments)

### 1. Clone the repository

```sh
git clone https://github.com/yourusername/DevBazaar.git
cd DevBazaar
```

### 2. Setup Backend

```sh
cd Backend
npm install
# Create a .env file with your MongoDB, Cloudinary, Razorpay credentials
npm start
```

### 3. Setup Frontend

```sh
cd ../app
npm install
npm run dev
```

### 4. Access the App

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

---

## API Endpoints

- `/api/auth` – User authentication (signup, login, logout)
- `/Product` – Product CRUD
- `/category` – Category CRUD
- `/Cart` – Cart management
- `/wishList` – Wishlist management
- `/order` – Order management
- `/payment` – Payment processing (Razorpay)
- `/review` – Product reviews
- `/Contect` – Contact/Support
- `/Admin` – Admin stats

*(See `Backend/routes/` for full details)*

---

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the ISC License.

---

## Contact

- Email: exclusive@gmail.com
- Support: customer@exclusive.com
- Address: 111 Bijoy Sarani, Dhaka, Bangladesh
- Phone: +88015-88888-9999

---
