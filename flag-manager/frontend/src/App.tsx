import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import NewFlagForm from "./components/NewFlagForm"
import Flags from "./components/Flags"
import ObservabilityContainer from "./components/ObservabilityContainer"
import FormHook from "./components/FormHook"
import './App.css'
function App() {

  return (
    <div className="application">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Flags />} />
        <Route path="flags" element={<Flags />} />
        <Route path="flags/observability" element={<ObservabilityContainer />} />
        <Route path="flags/add" element={<NewFlagForm />} />
        <Route path="flags/hook-form" element={<FormHook />} />
      </Route>
    </Routes>
    </div>
  )
}

export default App
