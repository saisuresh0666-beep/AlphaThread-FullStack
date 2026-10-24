# ALPHATHREAD

A full-stack e-commerce application with a customer storefront, an admin dashboard, and a REST API. Customers can browse products, manage a size-based cart, place orders, pay with Razorpay, and view their order history. Administrators can sign in to add, remove, and manage products and orders.

## Tech stack

- **Frontend:** React, Vite, Tailwind CSS, React Router, Axios
- **Admin dashboard:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB/Mongoose
- **Services:** Cloudinary for image uploads and Razorpay for payments

## Project structure

```text
e-commerce/
|- frontend/  # Customer-facing React application (port 5173)
|- admin/     # Admin React application (port 5174)
`- backend/   # Express API and MongoDB models (port 3000)
```

## Prerequisites

- Node.js 18 or later
- A MongoDB connection string
- A Cloudinary account (for product image uploads)
- A Razorpay account (for online payments)

## Installation

Install dependencies for each application:

```bash
cd frontend
npm install

cd ../admin
npm install

cd ../backend
npm install
```

## Environment variables

Create `backend/.env`:

```env
PORT=3000
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster-url>
JWT_SECRET=<secure-random-secret>

CLOUDINARY_NAME=<cloudinary-cloud-name>
CLOUDINARY_API_KEY=<cloudinary-api-key>
CLOUDINARY_SECRET_KEY=<cloudinary-api-secret>

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=<admin-password>

RAZORPAY_KEY_ID=<razorpay-key-id>
RAZORPAY_KEY_SECRET=<razorpay-key-secret>
```

The backend connects to a database named `at_db` by appending it to `MONGODB_URL`.

Create `frontend/.env`:

```env
VITE_BACKEND_URL=http://localhost:3000
VITE_RAZORPAY_KEY_ID=<razorpay-key-id>
```

Create `admin/.env`:

```env
VITE_BACKEND_URL=http://localhost:3000
```

Never commit `.env` files or real credentials.

## Run locally

Start these commands in three separate terminals:

```bash
# Terminal 1 - API
cd backend
npm run server

# Terminal 2 - Storefront
cd frontend
npm run dev

# Terminal 3 - Admin dashboard
cd admin
npm run dev
```

Open the storefront at `http://localhost:5173` and the admin dashboard at `http://localhost:5174`.

## Available scripts

| Application | Command | Purpose |
| --- | --- | --- |
| `frontend` | `npm run dev` | Start the customer app in development mode |
| `frontend` | `npm run build` | Create a production build |
| `frontend` | `npm run lint` | Run ESLint |
| `admin` | `npm run dev` | Start the admin dashboard in development mode |
| `admin` | `npm run build` | Create a production build |
| `admin` | `npm run lint` | Run ESLint |
| `backend` | `npm start` | Start the API with Node.js |
| `backend` | `npm run server` | Start the API with nodemon |

## API overview

| Area | Base path | Capabilities |
| --- | --- | --- |
| Users | `/api/user` | Registration, login, admin login, profile management |
| Products | `/api/product` | List and view products; add and remove products as an admin |
| Cart | `/api/cart` | Add items, update quantities, retrieve the signed-in user's cart |
| Orders | `/api/order` | Place orders, create and verify Razorpay payments, view and manage orders |

Authenticated customer endpoints expect a JWT in the `token` request header. Admin-only product and order operations use the admin token returned by the admin login endpoint.

## Deployment

Each application includes a `vercel.json` configuration. Deploy `frontend`, `admin`, and `backend` as separate Vercel projects, set the corresponding environment variables in each project, and point both `VITE_BACKEND_URL` values to the deployed API URL.
