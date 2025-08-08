import Panel from "./Panel";
import { byVariantDashboardBody, byVariantFrontendDashboardBody } from "../models/dashboard";

interface FlagDashboardProps {
  flagKey: string;
  flagDashboardLoaded: boolean
}

const FlagDashboard:React.FC<FlagDashboardProps> = ({flagKey, flagDashboardLoaded}) => {
  return (
    <>
      {flagDashboardLoaded && (
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            Flag Dashboard: <span className="font-mono text-gray-800">{flagKey}</span>
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Backend</h3>
              <Panel dashboardId={byVariantDashboardBody.metadata.name} panelId={1} variables={[flagKey]} />
              <Panel dashboardId={byVariantDashboardBody.metadata.name} panelId={2} variables={[flagKey]} />
              <Panel dashboardId={byVariantDashboardBody.metadata.name} panelId={3} variables={[flagKey]} />
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Frontend</h3>
              <Panel dashboardId={byVariantFrontendDashboardBody.metadata.name} panelId={1} variables={[flagKey]} />
              <Panel dashboardId={byVariantFrontendDashboardBody.metadata.name} panelId={2} variables={[flagKey]} />
              <Panel dashboardId={byVariantFrontendDashboardBody.metadata.name} panelId={3} variables={[flagKey]} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FlagDashboard;