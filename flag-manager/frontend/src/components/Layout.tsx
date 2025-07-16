import NavigationBar from "./NavigationBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <h1>Welcome to the Feature Flag App!</h1>
      <NavigationBar />
      <Outlet />
    </>
  )
}

export default Layout