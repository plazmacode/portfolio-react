import { Outlet, ScrollRestoration } from "react-router";
import SiteNav from "./components/SiteNav/SiteNav";

export default function Layout() {
  return (
    <>
      <SiteNav/>
      <ScrollRestoration/>
      <Outlet />
    </>
  );
}