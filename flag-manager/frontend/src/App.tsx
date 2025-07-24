import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import NewFlagForm from "./components/NewFlagForm"
import Flags from "./components/Flags"
import Dashboard from "./components/Dashboard"
import FormHook from "./components/FormHook"

function App() {

  return (
    <div className="application">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Flags />} />
        <Route path="flags" element={<Flags />} />
        <Route path="flags/observability" element={<Dashboard />} />
        <Route path="flags/add" element={<NewFlagForm />} />
        <Route path="flags/hook-form" element={<FormHook />} />
      </Route>
    </Routes>
    </div>
  )
}

export default App
