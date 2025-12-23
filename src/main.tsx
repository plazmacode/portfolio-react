import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './Layout.tsx';
import About from './pages/About/About';
import FloraHive from './pages/FloraHive/FloraHive.tsx';
import Works from './pages/Works/Works.tsx';
import Interactive from './pages/Interactive/Interactive.tsx';
import FloraHiveMetrics from './pages/FloraHiveMetrics/FloraHiveMetrics.tsx';
import Gamebox from './pages/Gamebox/Gamebox.tsx';
import FloraHiveWorks from './pages/Works/FloraHive/FloraHiveWorks.tsx';
import MetricsWorks from './pages/Works/FloraHiveMetrics/MetricsWorks.tsx';
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
      { path: "/works", element: <Works/>},
      { path: "/works/florahive", element: <FloraHiveWorks/>},
      { path: "/works/florahive-metrics", element: <MetricsWorks/>},
      { path: "/interactive", element: <Interactive/>},
      { path: "*", element: <PageNotFound/>}
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
)
