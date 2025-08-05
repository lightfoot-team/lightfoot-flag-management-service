interface DashboardProps {
  dashboardId: string;
  variables: Array<unknown>;
}

const Dashboard:React.FC<DashboardProps> = ({ dashboardId, variables }) => {
  const baseUrl = 'http://localhost:3002';
  const queryParams = new URLSearchParams({
    orgId: '1',
    theme: 'dark',
    ...Object.fromEntries(
      Object.entries(variables).map(([key, val]) => [`var-${key}`, val])
    ),
  });

  const iframeSrc = `${baseUrl}/d/${dashboardId}?${queryParams}`;

  return (
    <iframe
      src={iframeSrc}
      width="80%"
      height="510em"
    ></iframe>
  );
};

export default Dashboard;