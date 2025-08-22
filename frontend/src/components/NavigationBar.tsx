import { Link } from "react-router-dom"

const NavigationBar = () => {
  return (
    <nav className="w-full bg-gray-800 text-white shadow mb-6">
      <div className="container mx-auto flex space-x-6 px-4 py-3">
        <Link to="/flags" className="hover:text-yellow-400 font-medium text-xl">
          Flags
        </Link>
        <Link to="/flags/observability" className="hover:text-yellow-400 font-medium text-xl">
          Observability
        </Link>
      </div>
    </nav>
  );
};

export default NavigationBar