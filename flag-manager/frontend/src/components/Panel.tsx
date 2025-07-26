import { useState } from 'react';

interface PanelProps {
  dashboardId: string
  panelId: number
  variables: Array<unknown>
}
export default function Panel(panelProps: PanelProps) {
  const {dashboardId, panelId, variables} = panelProps
  const [refreshKey, setRefreshKey] = useState(0);

  const baseUrl = 'http://localhost:3002';
  const queryParams = new URLSearchParams({
    orgId: '1',
    theme: 'dark',
    panelId: panelId.toString(),
    ...Object.fromEntries(
      Object.entries(variables).map(([key, val]) => [`var-${key}`, val])
    ),
  });

  const iframeSrc = `${baseUrl}/d-solo/${dashboardId}?${queryParams}`;

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div>
      <button onClick={handleRefresh}>Refresh panel</button>
      <iframe
        key={refreshKey}
        src={iframeSrc}
        width="80%"
        height="300px"
      ></iframe>
    </div>
  );
}
