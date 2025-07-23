import NavigationBar from "./NavigationBar";
import { Outlet } from "react-router-dom";
import Panel from "./Panel";
import Dashboard from "./Dashboard"
import { useEffect } from "react";
import { createDashboard, getDashboard } from "../services/grafana";
import { uids } from "../models/dashboard";
import { redDashboardBody } from "../models/dashboard";

const Layout = () => {
  console.log('Name:', redDashboardBody.metadata.name)
  useEffect(() => {
    const dashboard = async () => {
      if (uids.includes(redDashboardBody.metadata.name)) {
        const uid = redDashboardBody.metadata.name;

        const response = await getDashboard(uid);
        return response;
      } else {
      const response = await createDashboard(redDashboardBody);
      console.log(response);
      uids.push('redDashboardBody.metadata.name')
    }
    }
    dashboard()
  }, [])

  return (
    <>
      <h1>Welcome to the Feature Flag App!</h1>
      {/* <iframe src="http://localhost:3002/d-solo/64daa860-5d81-4078-979a-107e984fdf57/new-dashboard?orgId=1&from=1753170283267&to=1753191883267&timezone=browser&panelId=1&__feature.dashboardSceneSolo"
        width="450" height="200"
      >
      </iframe>
      <iframe src="http://localhost:3002/d-solo/gdxccn/example-dashboard?orgId=1&from=1753170283267&to=1753191883267&timezone=browser&panelId=1&__feature.dashboardSceneSolo"
        width="450" height="200"
      >
      </iframe>
      */}
      <Panel
        dashboardId={redDashboardBody.metadata.name}
        panelId={2}
        variables={[]}
      >

      </Panel>
      <Dashboard dashboardId={redDashboardBody.metadata.name} variables={[]}>

      </Dashboard>
      <NavigationBar />
      <Outlet />
    </>
  )
}

export default Layout