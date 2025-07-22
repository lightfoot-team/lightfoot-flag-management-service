interface PanelProps {
  dashboardId: string
  panelId: number
  variables: Array<unknown>
}
export default function Panel(panelProps: PanelProps) {
  const {dashboardId, panelId, variables} = panelProps
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

  return (
    <iframe
      src={iframeSrc}
      width="450"
      height="200"
    ></iframe>
  );
}
