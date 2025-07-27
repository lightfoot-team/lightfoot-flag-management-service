import { Link } from "react-router-dom"

const NavigationBar = () => {
  // return (
  //   <div className='navBar container'>

  //     <div className='navBar item'>
  //       <Link to="/flags">Flags</Link>
  //     </div>

  //     <div className='navBar item'>
  //       <Link to="/flags/observability">Observability</Link>
  //     </div>

  //     <div className='navBar item'>
  //       <Link to="/flags/add">Add New Flag</Link>
  //     </div>

  //     <div className='navBar item'>
  //       <Link to="/flags/rules">Rules</Link>
  //     </div>

  //   </div>
  // )
  return (
    <nav className="w-full bg-gray-800 text-white shadow mb-6">
      <div className="container mx-auto flex space-x-6 px-4 py-3">
        <Link to="/flags" className="hover:text-yellow-400 font-medium">
          Flags
        </Link>
        <Link to="/flags/observability" className="hover:text-yellow-400 font-medium">
          Observability
        </Link>
        <Link to="/flags/add" className="hover:text-yellow-400 font-medium">
          Add New Flag
        </Link>
        <Link to="/flags/rules" className="hover:text-yellow-400 font-medium">
          Rules
        </Link>
      </div>
    </nav>
  );
}

export default NavigationBar