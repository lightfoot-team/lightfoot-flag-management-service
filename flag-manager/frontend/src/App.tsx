import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import NewFlagForm from "./components/NewFlagForm"
import Flags from "./components/Flags"

function App() {

  return (
    <div className="application">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<></>} />
        <Route path="flags" element={<Flags />} />
        <Route path="flags/add" element={<NewFlagForm />} />
      </Route>
    </Routes>
    </div>
  )
}

export default App
