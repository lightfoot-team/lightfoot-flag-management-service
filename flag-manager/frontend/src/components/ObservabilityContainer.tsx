import Panel from "./Panel";
import { redDashboardBody, frontendDashboardBody } from "../models/dashboard";

interface ObservabilityContainerProps {
  dashboardLoaded: boolean
}

const ObservabilityContainer:React.FC<ObservabilityContainerProps> = ({ dashboardLoaded }) => {
  return (
    <>
      {dashboardLoaded && (
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Backend</h3>
              <Panel dashboardId={redDashboardBody.metadata.name} panelId={1} variables={[]} />
              <Panel dashboardId={redDashboardBody.metadata.name} panelId={2} variables={[]} />
              <Panel dashboardId={redDashboardBody.metadata.name} panelId={3} variables={[]} />
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Frontend</h3>
              <Panel dashboardId={frontendDashboardBody.metadata.name} panelId={1} variables={[]} />
              <Panel dashboardId={frontendDashboardBody.metadata.name} panelId={2} variables={[]} />
              <Panel dashboardId={frontendDashboardBody.metadata.name} panelId={3} variables={[]} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ObservabilityContainer;