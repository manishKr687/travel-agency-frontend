import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import { routes } from './routes.jsx';
import { PackagesProvider } from './context/PackagesContext.jsx';

const router = createBrowserRouter(routes);

function App() {
  return (
    <PackagesProvider>

      <WhatsAppButton />
      <RouterProvider router={router} />
    </PackagesProvider>
  );
}

export default App;