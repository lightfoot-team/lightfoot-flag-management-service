import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import NewFlagForm from "./components/NewFlagForm"
import Flags from "./components/Flags"
//import DashboardContainer from "./components/ObservabilityContainer"
import ObservabilityContainer from "./components/ObservabilityContainer"
import { useState, useEffect } from "react"
import FlagViewPage from "./components/FlagViewPage"
import { getDashboard, createDashboard } from "./services/grafana"
import { redDashboardBody, byVariantDashboardBody } from "./models/dashboard"
import './App.css'
import Rules from "./components/Rules"
function App() {
  const [dashboardsLoaded, setDashboardsLoaded] = useState({
    overview: false,
    byVariant: false
  })
  useEffect(() => {
    const loadOverview = async () => {
      try {
        await getDashboard(redDashboardBody.metadata.name);
        setDashboardsLoaded({ ...dashboardsLoaded, overview: true });
      } catch (error) {
        await createDashboard(redDashboardBody);
        setDashboardsLoaded({ ...dashboardsLoaded, overview: true });
      }
    }
    const loadByVariant = async () => {
      try {
        await getDashboard(byVariantDashboardBody.metadata.name);
        setDashboardsLoaded({ ...dashboardsLoaded, byVariant: true });
      } catch (error) {
        await createDashboard(byVariantDashboardBody);
        setDashboardsLoaded({ ...dashboardsLoaded, byVariant: true });
      }
    }
    loadOverview()
    loadByVariant()
  }, [dashboardsLoaded])
  return (
    <div className="application">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Flags />} />
          <Route path="flags" element={<Flags />} />
          <Route path="flags/:flagKey" element={<FlagViewPage />} />
          <Route path="flags/observability" element={<ObservabilityContainer dashboardLoaded={dashboardsLoaded.overview}></ObservabilityContainer>} />
          <Route path="flags/add" element={<NewFlagForm />} />
          <Route path="flags/rules" element={<Rules></Rules>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
