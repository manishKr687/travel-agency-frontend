import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WhatsAppButton from './components/WhatsAppButton';
import { routes } from './routes.jsx';

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <WhatsAppButton />
      <RouterProvider router={router} />
    </>
  );
}

export default App;