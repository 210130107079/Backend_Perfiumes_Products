# P_Backend

This project is a backend server built with Node.js, Express, and MongoDB. It provides APIs for managing users, products, brands, and categories. Below is a detailed explanation of the available routes and their functionalities.

---

## Table of Contents
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [Product Routes](#product-routes)
  - [Brand Routes](#brand-routes)
  - [Category Routes](#category-routes)
- [Middleware](#middleware)
- [Models](#models)

---

## Environment Variables

The following environment variables are required for the application to run:

- `PORT`: The port on which the server runs.
- `JWT_SECRET`: Secret key for JWT token generation.
- `MONGO_URI`: MongoDB connection string.
- `NODE_ENV`: The environment mode (e.g., development).

---

## API Endpoints

### User Routes

**Base URL**: `/api/users`

| Method | Endpoint       | Description                     |
|--------|----------------|---------------------------------|
| POST   | `/login`       | Logs in a user and generates a JWT token. |
| POST   | `/logout`      | Logs out a user by clearing the token cookie. |

---

### Product Routes

**Base URL**: `/api/product`

| Method | Endpoint                  | Description                                      |
|--------|---------------------------|--------------------------------------------------|
| POST   | `/add`                    | Adds a new product (Admin only).                |
| POST   | `/:id/update-body`        | Updates product details by ID.                  |
| GET    | `/get-all`                | Retrieves all products (Admin: all, Manager: active only). |
| GET    | `/:id/get`                | Retrieves a product by ID.                      |
| GET    | `/:id/delete`             | Deletes a product by ID.                        |
| PUT    | `/:id/update-images`      | Updates product images by ID.                   |
| PUT    | `/:id/status-change`      | Toggles the active status of a product.         |

---

### Brand Routes

**Base URL**: `/api/brand`

| Method | Endpoint       | Description                     |
|--------|----------------|---------------------------------|
| POST   | `/add`         | Adds a new brand.              |
| POST   | `/:id/delete`  | Deletes a brand by ID.         |
| GET    | `/get`         | Retrieves all brands.          |
| PUT    | `/:id/update`  | Updates a brand by ID.         |

---

### Category Routes

**Base URL**: `/api/category`

| Method | Endpoint       | Description                     |
|--------|----------------|---------------------------------|
| POST   | `/add`         | Adds a new category.           |
| POST   | `/:id/delete`  | Deletes a category by ID.      |
| GET    | `/get`         | Retrieves all categories.      |
| PUT    | `/:id/update`  | Updates a category by ID.      |

---

## Middleware

### `userAuth`
- Verifies the JWT token for admin users.
- Adds the `username` to the `req` object.

### `managerAuth`
- Verifies the manager token.
- Adds the `userId` to the `req.body`.

### `multer`
- Handles file uploads for product images.
- Stores files in the `uploads` directory.

---

## Models

### Product Model
- **Fields**:
  - `images`: Array of image paths.
  - `productName`: Name of the product.
  - `brand`: Associated brand.
  - `category`: Associated category.
  - `price`: Price of the product.
  - `isActive`: Boolean indicating if the product is active.

### Category Model
- **Fields**:
  - `categoryName`: Unique name of the category.
  - `categoryDescription`: Description of the category.

### Brand Model
- **Fields**:
  - `brandName`: Unique name of the brand.
  - `brandDescription`: Description of the brand.

---

## Database Configuration

The MongoDB connection is configured in `config/db.js`. Ensure the `MONGO_URI` environment variable is set correctly.

---

## How to Run

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure the environment variables.
4. Start the server:
   ```bash
   npm run dev
   ```
5. The server will run on the port specified in the `.env` file (default: `8080`).

---

## Notes

- Ensure the `uploads` directory exists for file uploads.
- Use Postman or a similar tool to test the API endpoints.
