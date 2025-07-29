import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import NewFlagForm from "./components/NewFlagForm"
import Flags from "./components/Flags"
import ObservabilityContainer from "./components/ObservabilityContainer"
import { useState, useEffect } from "react"
import FlagViewPage from "./components/FlagViewPage"
import { getDashboard, createDashboard } from "./services/grafana"
import { redDashboardBody, byVariantDashboardBody } from "./models/dashboard"
import './App.css'
import Rules from "./components/Rules"

function App() {

  const [overviewDashboardLoaded, setOverviewDashboardLoaded] = useState(false);
  const [variantsDashboardLoaded, setVariantsDashboardLoaded] = useState(false);

  useEffect(() => {
    const loadOverview = async () => {
      try {
        await getDashboard(redDashboardBody.metadata.name);
        setOverviewDashboardLoaded(true);
      } catch (error) {
        await createDashboard(redDashboardBody);
        setOverviewDashboardLoaded(true);
      }
    }

    const loadByVariant = async () => {
      try {
        await getDashboard(byVariantDashboardBody.metadata.name);
        setVariantsDashboardLoaded(true);
      } catch (error) {
        await createDashboard(byVariantDashboardBody);
        setVariantsDashboardLoaded(true);
      }
    }

    loadOverview()
    loadByVariant()
  }, [overviewDashboardLoaded, variantsDashboardLoaded])

  return (
    <div className="application">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Flags />} />
          <Route path="flags" element={<Flags />} />
          <Route path="flags/:flagKey" element={<FlagViewPage flagDashboardLoaded={variantsDashboardLoaded}></FlagViewPage>} />
          <Route path="flags/observability" element={<ObservabilityContainer dashboardLoaded={overviewDashboardLoaded}></ObservabilityContainer>} />
          <Route path="flags/add" element={<NewFlagForm />} />
          <Route path="flags/rules" element={<Rules></Rules>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
