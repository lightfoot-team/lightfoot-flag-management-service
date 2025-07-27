import { useEffect } from "react";
import Panel from "./Panel";
import { byVariantDashboardBody } from "../models/dashboard";
import { createDashboard, getDashboard } from "../services/grafana";
import { uids } from "../models/dashboard";

interface FlagDashboardProps {
  flagKey: string;
}

const FlagDashboard:React.FC<FlagDashboardProps> = ({ flagKey }) => {
  // uids.pop();
  useEffect(() => {
    const dashboard = async () => {
      try {
        if (uids.includes(byVariantDashboardBody.metadata.name)) {
          const uid = byVariantDashboardBody.metadata.name;

          const response = await getDashboard(uid);
          return response;
        } else {
          const response = await createDashboard(byVariantDashboardBody);
          console.log(response);
          uids.push(byVariantDashboardBody.metadata.name)
        }
      } catch (error) {
        console.error('Dashboard operation failed:', error);
      }
    }
    dashboard()
  }, []);

  return (
    <div>
      <Panel dashboardId={byVariantDashboardBody.metadata.name} panelId={1} variables={[flagKey]}></Panel>
      <Panel dashboardId={byVariantDashboardBody.metadata.name} panelId={2} variables={[flagKey]}></Panel>
      <Panel dashboardId={byVariantDashboardBody.metadata.name} panelId={3} variables={[flagKey]}></Panel>
    </div>
  );
}

export default FlagDashboard;