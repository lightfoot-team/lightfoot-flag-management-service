import Panel from "./Panel";
import { useEffect, useState } from "react";
import { createDashboard, getDashboard } from "../services/grafana";
import { redDashboardBody } from "../models/dashboard";

const ObservabilityContainer = () => {
  const [dashboardLoaded, setDashboardLoaded] = useState(false);
  console.log('Name:', redDashboardBody.metadata.name)
  useEffect(() => {
    const dashboard = async () => {
      try {
        await getDashboard(redDashboardBody.metadata.name);
        setDashboardLoaded(true);
      } catch (error) {
        await createDashboard(redDashboardBody);
        setDashboardLoaded(true);
      }
    }
    dashboard()
  }, [dashboardLoaded])

  return (
    <>
    {dashboardLoaded && (<div className="flex flex-col items-center space-y-6 px-4 py-6">
      <Panel
        dashboardId={redDashboardBody.metadata.name}
        panelId={1}
        variables={[]}
      />
      <Panel
        dashboardId={redDashboardBody.metadata.name}
        panelId={2}
        variables={[]}
      />
      <Panel
        dashboardId={redDashboardBody.metadata.name}
        panelId={3}
        variables={[]}
      />
    </div>
  )}
  </>
  );
}

export default ObservabilityContainer;