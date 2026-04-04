import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './Layout.tsx';
import About from './pages/About/About';
import Works from './pages/Works/Works.tsx';
import Interactive from './pages/Interactive/Interactive.tsx';
import Gamebox from './pages/Works/Gamebox/Gamebox.tsx';
import FloraHiveWorks from './pages/Works/FloraHive/FloraHiveWorks.tsx';
import Conversio from './pages/Works/Conversio/ConversioWorks.tsx';
import MetricsWorks from './pages/Works/FloraHiveMetrics/MetricsWorks.tsx';
import PageNotFound from './pages/PageNotFound/PageNotFound.tsx';
import App from './App.tsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import BugReport from './pages/Works/BugReport/BugReport.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: "about", element: <About /> },
      { path: "works", element: <Works /> },
      { path: "works/gamebox", element: <Gamebox /> },
      { path: "works/conversio", element: <Conversio /> },
      { path: "works/florahive", element: <FloraHiveWorks /> },
      { path: "works/florahive-metrics", element: <MetricsWorks /> },
      {path: "bugreport", element: <BugReport /> },
      { path: "interactive", element: <Interactive /> },
      { path: "*", element: <PageNotFound /> }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
)
