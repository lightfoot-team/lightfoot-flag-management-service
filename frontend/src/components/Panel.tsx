import { useState } from 'react';

interface PanelProps {
  dashboardId: string
  panelId: number
  variables: Array<unknown>
  title: string
}

const Panel:React.FC<PanelProps> = ({dashboardId, panelId, variables, title}) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const baseUrl = 'http://localhost:3002';
  const queryParams = new URLSearchParams({
    orgId: '1',
    theme: 'dark',
    panelId: panelId.toString(),
    'var-feature_flag_key': variables[0] as string,
  });

  const iframeSrc = `${baseUrl}/d-solo/${dashboardId}?${queryParams.toString()}`;

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="w-full bg-gray-900 p-4 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-semibold text-white">{title}</h1>
        <button
          onClick={handleRefresh}
          className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Refresh panel
        </button>
      </div>
      <iframe
        key={refreshKey}
        src={iframeSrc}
        className="w-full h-[400px] border rounded"
      ></iframe>
    </div>
  );
};

export default Panel;