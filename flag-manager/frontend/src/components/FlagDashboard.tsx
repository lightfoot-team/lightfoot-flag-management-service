// import { useState } from "react";
import Panel from "./Panel";
import { byVariantDashboardBody } from "../models/dashboard";
// import { createDashboard, getDashboard } from "../services/grafana";

interface FlagDashboardProps {
  flagKey: string;
  flagDashboardLoaded: boolean
}

const FlagDashboard:React.FC<FlagDashboardProps> = (props: FlagDashboardProps) => {
  const { flagKey, flagDashboardLoaded } = props
  // const [dashboardLoaded, setDashboardLoaded] = useState(false);

  // useEffect(() => {
  //     const dashboard = async () => {
  //       try {
  //         await getDashboard(byVariantDashboardBody.metadata.name);
  //         setDashboardLoaded(true);
  //       } catch (error) {
  //         await createDashboard(byVariantDashboardBody);
  //         setDashboardLoaded(true);
  //         console.error('Get Dashboard failed, creating dashboard instead.', error);
  //       }
  //     }
  //     dashboard()
  //   }, [dashboardLoaded])

  return (
    <>
    {flagDashboardLoaded && <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Flag Dashboard: <span className="font-mono text-blue-600">{flagKey}</span></h2>
      <Panel dashboardId={byVariantDashboardBody.metadata.name} panelId={1} variables={[flagKey]} />
      <Panel dashboardId={byVariantDashboardBody.metadata.name} panelId={2} variables={[flagKey]} />
      <Panel dashboardId={byVariantDashboardBody.metadata.name} panelId={3} variables={[flagKey]} />
    </div>}
  </>
  );
}

export default FlagDashboard;