import { Link } from "react-router-dom"

const NavigationBar = () => {
  return (
    <div className='navBar container'>

      <div className='navBar item'>
        <Link to="/flags">Flags</Link>
      </div>

      <div className='navBar item'>
        <Link to="/flags/observability">Observability</Link>
      </div>

      <div className='navBar item'>
        <Link to="/flags/add">Add New Flag</Link>
      </div>

      <div className='navBar item'>
        <Link to="/flags/rules">Rules</Link>
      </div>

    </div>
  )
}

export default NavigationBar