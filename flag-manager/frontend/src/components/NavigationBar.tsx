import { Link } from "react-router-dom"

const NavigationBar = () => {
  return (
    <ul>
      <li>
        <Link to="/flags">Flags</Link>
      </li>
      <li>
        <Link to="/flags/add">Add New Flag</Link>
      </li>
      <li>
        <Link to="/flags/hook-form">Form Refactor In Progress</Link>
      </li>
    </ul>
  )
}

export default NavigationBar