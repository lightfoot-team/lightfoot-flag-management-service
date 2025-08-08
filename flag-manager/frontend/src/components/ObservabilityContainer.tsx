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
              <h1 className="text-3xl font-semibold text-gray-700">Backend</h1>
              <Panel dashboardId={redDashboardBody.metadata.name} panelId={1} variables={[]} title="Duration" />
              <Panel dashboardId={redDashboardBody.metadata.name} panelId={2} variables={[]} title="Rate" />
              <Panel dashboardId={redDashboardBody.metadata.name} panelId={3} variables={[]} title="Error" />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold text-gray-700">Frontend</h1>
              <Panel dashboardId={frontendDashboardBody.metadata.name} panelId={1} variables={[]} title ="Loading"/>
              <Panel dashboardId={frontendDashboardBody.metadata.name} panelId={2} variables={[]} title ="Interactivity (INP)"/>
              <Panel dashboardId={frontendDashboardBody.metadata.name} panelId={3} variables={[]} title ="Visual Stability (CLS)"/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ObservabilityContainer;