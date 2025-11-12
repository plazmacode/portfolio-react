import { Outlet } from "react-router";
import SiteNav from "./components/SiteNav/SiteNav";

export default function Layout() {
  return (
    <>
      <SiteNav/>
      <Outlet />
    </>
  );
}