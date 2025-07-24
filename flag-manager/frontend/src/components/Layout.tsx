import NavigationBar from "./NavigationBar";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <h1>LightFoot</h1>

      <NavigationBar />
      <Outlet />
    </>
  )
}

export default Layout