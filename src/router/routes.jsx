import { AboutUs, Home, NotFound, Product, Products } from '@/pages';

export const routes = [
  // /
  {
    index: true,
    Component: Home,
    handle: {
      navigation: {
        label: 'Home',
      },
    },
  },

  // /about-us
  {
    path: 'about-us',
    Component: AboutUs,
    handle: {
      navigation: {
        label: 'About Us',
      },
    },
  },

  // /products, /products/:productId
  {
    path: 'products',
    handle: {
      navigation: {
        label: 'Products',
      },
    },

    children: [
      {
        index: true,
        Component: Products,
      },

      {
        path: ':productId',
        Component: Product,
      },
    ],
  },

  // 404
  {
    path: '*',
    Component: NotFound,
  },
];

export const navLinks = routes
  .filter((route) => route.handle?.navigation)
  .map((route) => ({
    to: route.index ? '/' : `/${route.path}`,
    label: route.handle.navigation.label,
  }));
