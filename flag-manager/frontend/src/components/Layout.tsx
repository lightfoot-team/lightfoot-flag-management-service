import NavigationBar from "./NavigationBar";
import { Outlet } from "react-router-dom";
import Panel from "./Panel";
import { useEffect } from "react";
import { createDashboard, getDashboard } from "../services/grafana";
import { uids } from "../models/dashboard";
const Layout = () => {
  console.log(uids)
  useEffect(() => {
    const dashboard = async () => {
      if (uids.length > 0) {
        const uid = uids[0];
    
        const response = await getDashboard(uid);
        return response;
      } else {
        const response = await createDashboard();
        console.log(response);
        uids.push('gdxccn')
      }
    }
    dashboard()
  }, [])

  return (
    <>
      <h1>Welcome to the Feature Flag App!</h1>
      <iframe src="http://localhost:3002/d-solo/64daa860-5d81-4078-979a-107e984fdf57/new-dashboard?orgId=1&from=1753170283267&to=1753191883267&timezone=browser&panelId=1&__feature.dashboardSceneSolo"
        width="450" height="200"
      >
      </iframe>
      <iframe src="http://localhost:3002/d-solo/gdxccn/example-dashboard?orgId=1&from=1753170283267&to=1753191883267&timezone=browser&panelId=1&__feature.dashboardSceneSolo"
        width="450" height="200"
      >
      </iframe>
      <Panel
        dashboardId={'64daa860-5d81-4078-979a-107e984fdf57'}
        panelId={1}
        variables={[]}
      >

      </Panel>
      <NavigationBar />
      <Outlet />
    </>
  )
}

export default Layout