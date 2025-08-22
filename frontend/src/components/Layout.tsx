import NavigationBar from "./NavigationBar";
import { Outlet } from "react-router-dom";
import LightFootLogo from "../assets/LightFoot.svg"

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-white shadow">
        {/* <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-800">LightFoot</h1>
        </div> */}
        <div className="container mx-auto px-4 py-6 flex items-center gap-3">
          <img src={LightFootLogo} alt="LightFoot logo" className="h-14 w-14" />
          <h1 className="text-3xl font-bold tracking-tight text-gray-800">
            LightFoot
          </h1>
        </div>
      </header>

      <NavigationBar />

      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;