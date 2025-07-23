interface DashboardProps {
  dashboardId: string;
  variables: Array<unknown>;
}

export default function Dashboard(dashboardProps: DashboardProps) {
  const {dashboardId, variables} = dashboardProps
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
      width="50%"
      height="300em"
    ></iframe>
  );
}