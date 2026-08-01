# React Router Store

<img src="public/favicon.svg" alt="React Router Store icon" width="48" />

A React Router exercise from my web development course. It builds a small storefront with shared layouts, API data, nested routes, and dynamic product pages.

## Exercise

Using [Fake Store API](https://fakestoreapi.com/) as a mock API backend:

- create Home, About Us, and Products pages;
- add a persistent Navbar with active link styles;
- fetch and display the product catalog;
- link every product to a dynamic `/products/:productId` page;
- handle loading states and unmatched routes.

## Solution

The app uses React Router in Data Mode with `createBrowserRouter` and `RouterProvider`. Route objects are defined in [`src/router/routes.jsx`](./src/router/routes.jsx), where navigation metadata is used to derive the main Navbar links from the same source of truth.

The shared [`RootLayout`](./src/layouts/RootLayout.jsx) renders the Header, page content, and Footer. Product fetching, validation, UI states, and feature components are organized inside [`src/features/products`](./src/features/products).

## Project structure

```text
src/
├── main.jsx
├── router/
│   ├── router.jsx
│   └── routes.jsx
├── layouts/
│   └── RootLayout.jsx
├── pages/
├── features/
│   └── products/
└── components/
    └── ui/
```

## Run locally

- Clone the repo `https://github.com/emanuelefavero/react-router.git`
- `cd` into the project folder
- Run:

  ```bash
  npm install
  npm run dev
  ```

- Open `http://localhost:5173` in your browser to see the app.
