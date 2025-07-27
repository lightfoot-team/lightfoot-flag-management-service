import Panel from "./Panel";
// import Dashboard from "./Dashboard"
import { useEffect } from "react";
import { createDashboard, getDashboard } from "../services/grafana";
import { uids } from "../models/dashboard";
import { redDashboardBody } from "../models/dashboard";
// uids.pop();
const ObservabilityContainer = () => {
  console.log('Name:', redDashboardBody.metadata.name)
  useEffect(() => {
    const dashboard = async () => {
      try {
        if (uids.includes(redDashboardBody.metadata.name)) {
          const uid = redDashboardBody.metadata.name;

          const response = await getDashboard(uid);
          return response;
        } else {
          const response = await createDashboard(redDashboardBody);
          console.log(response);
          uids.push(redDashboardBody.metadata.name)
        }
      } catch (error) {
        console.error('Dashboard operation failed:', error);
      }
    }
    dashboard()
  }, [])

  return (
    <div className="flex flex-col items-center space-y-6 px-4 py-6">
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
  );
}

export default ObservabilityContainer;