# Shopping List Frontend

A React-based frontend for the Shopping List application, built with Vite, TypeScript, Redux Toolkit, and Ant Design.

## Features

- View and search products
- Add products to cart
- Manage cart items (increase/decrease quantity, remove items)
- Add new products
- Edit existing products
- Responsive design
- Form validation
- Image upload support

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory and add the following:

   ```
   VITE_API_URL=http://localhost:5000/api/v1
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
  ├── components/         # React components
  ├── store/             # Redux store and slices
  ├── types/             # TypeScript type definitions
  ├── App.tsx           # Main App component
  ├── main.tsx          # Entry point
  └── index.css         # Global styles
```

## Features Implementation

### Product Management

- Products are displayed in a grid layout
- Each product shows image, name, price, and weight
- Products can be added to cart
- Stock quantity is tracked and displayed
- Products can be edited by clicking on them

### Cart Management

- Cart items can be increased/decreased
- Items can be removed from cart
- Cart total is calculated automatically
- Stock limits are enforced
- Cart can be cleared

### Product Forms

- Add/Edit forms with validation
- Image upload support
- Input restrictions:
  - Product Name: English letters only
  - Price: Numbers only
  - Weight: Numbers only
  - Inventory: Positive numbers only

## API Integration

The frontend integrates with the backend API endpoints:

- GET /product/ - Fetch all products
- POST /product/ - Add new product
- PATCH /product/{id} - Update product
- DELETE /product/{id} - Delete product

## Styling

The application uses Ant Design components and custom CSS for styling. The design is responsive and follows modern UI/UX practices.
