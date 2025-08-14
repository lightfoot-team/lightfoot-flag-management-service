import Panel from "./Panel";
import { byVariantDashboardBody } from "../models/dashboard";

interface FlagDashboardProps {
  flagKey: string;
  flagDashboardLoaded: boolean;
}

const BackendFlagDashboard: React.FC<FlagDashboardProps> = ({ flagKey, flagDashboardLoaded }) => {
  return (
    <>
      {flagDashboardLoaded && (
        <div className="p-4 bg-white rounded-lg shadow w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Flag Dashboard:{" "}
            <span className="font-mono text-blue-600">{flagKey}</span>
          </h2>

          <div className="flex flex-col gap-6">
            <div className="space-y-4 w-full">
              <h3 className="text-lg font-semibold text-gray-700">Backend</h3>
              <Panel
                dashboardId={byVariantDashboardBody.metadata.name}
                panelId={1}
                variables={[flagKey]}
                title="Rate"
              />
              <div className="flex gap-4">
                <div className="w-1/2">
                  <Panel
                    dashboardId={byVariantDashboardBody.metadata.name}
                    panelId={2}
                    variables={[flagKey]}
                    title="Error"
                  />
                </div>
                <div className="w-1/2">
                  <Panel
                    dashboardId={byVariantDashboardBody.metadata.name}
                    panelId={3}
                    variables={[flagKey]}
                    title="Duration"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BackendFlagDashboard;
