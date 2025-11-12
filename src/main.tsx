import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './Layout.tsx';
import About from './pages/About/About';
import FloraHive from './pages/FloraHive/FloraHive.tsx';
import FloraHiveMetrics from './pages/FloraHiveMetrics/FloraHiveMetrics.tsx';
import Gamebox from './pages/Gamebox/Gamebox.tsx';
import PageNotFound from './pages/PageNotFound/PageNotFound.tsx';
import App from './App.tsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      { path: "", element: <App/> },
      { path:"/about", element: <About/>},
      { path: "/florahive", element: <FloraHive/>},
      { path: "/florahive-metrics", element: <FloraHiveMetrics/>},
      { path: "/gamebox", element: <Gamebox/>},
      { path: "*", element: <PageNotFound/>}
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
)
