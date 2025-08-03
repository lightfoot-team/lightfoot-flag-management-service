import { Route, Routes, useNavigate } from "react-router-dom"
import Layout from "./components/Layout"
import Flags from "./components/Flags"
import ObservabilityContainer from "./components/ObservabilityContainer"
import { useState, useEffect } from "react"
import FlagPage from "./components/FlagPage"
import { getDashboard, createDashboard } from "./services/grafana"
import { redDashboardBody, byVariantDashboardBody, frontendDashboardBody } from "./models/dashboard"
import type { FlagDetails } from "./types/flagTypes"
import './App.css'
import { getAllFlags, deleteFlag, toggleFlag } from "./services/flags"
import { LightFootClientSDK, featureFlagsClient } from 'client-sdk'

const context = { username: 'admin' };
await LightFootClientSDK.init(context);

function App() {
  const [flags, setFlags] = useState<Array<FlagDetails>>([]);
  const [overviewDashboardLoaded, setOverviewDashboardLoaded] = useState(false);
  const [variantsDashboardLoaded, setVariantsDashboardLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlags = async () => {
      const response = await getAllFlags();
      setFlags(response.data)
    }
    fetchFlags()
  }, []);

  useEffect(() => {
    
    const val = featureFlagsClient.getBooleanValue("featured-park", true)
    console.log('Result', val)

  });

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

    const loadFrontend = async () => {
      try {
        await getDashboard(frontendDashboardBody.metadata.name);
        setOverviewDashboardLoaded(true);
      } catch (error) {
        await createDashboard(frontendDashboardBody);
        setOverviewDashboardLoaded(true);
      }
    }

    loadOverview();
    loadFrontend();
    loadByVariant();
  }, [overviewDashboardLoaded, variantsDashboardLoaded]);

  const handleDeleteFlag = (flagKey: string) => {
    if (confirm("Are you sure you want to delete this flag?")) {
      deleteFlag(flagKey);
      const newFlags = flags.filter(flag => flag.flagKey != flagKey);
      setFlags(newFlags);
      navigate("/flags");
    }
  }

  const handleToggleFlag = (flagKey: string) => {
    toggleFlag(flagKey);
    const newFlags = flags.map(flag => {
      if (flag.flagKey === flagKey) {
        flag.isEnabled = !flag.isEnabled;
      }
      return flag;
    });

    setFlags(newFlags);
  }

  const handleAddFlag = (newFlag: FlagDetails) => {
    setFlags(prev => [...prev, newFlag])
  }

  const handleUpdateFlag = (updatedFlag: FlagDetails) => {
    setFlags(prevFlags =>
      prevFlags.map(flag =>
        flag.flagKey === updatedFlag.flagKey ? updatedFlag : flag
      )
    );
  };


  return (
    <div className="application">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Flags flags={flags} onToggle={handleToggleFlag} onDelete={handleDeleteFlag} onAddFlag={handleAddFlag} onUpdateFlag={handleUpdateFlag}></Flags>} />
          <Route path="flags" element={<Flags flags={flags} onToggle={handleToggleFlag} onDelete={handleDeleteFlag} onAddFlag={handleAddFlag} onUpdateFlag={handleUpdateFlag}></Flags>} />
          <Route path="flags/:flagKey" element={<FlagPage flagDashboardLoaded={variantsDashboardLoaded} onToggle={handleToggleFlag} onDelete={handleDeleteFlag}></FlagPage>} />
          <Route path="flags/observability" element={<ObservabilityContainer dashboardLoaded={overviewDashboardLoaded}></ObservabilityContainer>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
