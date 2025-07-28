import { ratePanel, errorPanel, durationPanel } from "./panel";

export const uids: Array<string> = [
  'gdxccn'
];

const metadata = {
  "name": "gdlightfoot",
  "annotations": {
    "namespace": "default",
  }
}

const dashboardSpec3 = {
  "annotations": {
    "list": [
      {
        "builtIn": 1,
        "datasource": {
          "type": "grafana",
          "uid": "-- Grafana --"
        },
        "enable": true,
        "hide": true,
        "iconColor": "rgba(0, 211, 255, 1)",
        "name": "Annotations & Alerts",
        "type": "dashboard"
      }
    ]
  },
  "editable": true,
  "fiscalYearStartMonth": 0,
  "graphTooltip": 0,
  // "id": 3,
  "links": [],
  "panels": [
    {
      "datasource": {
        "type": "tempo",
        "uid": "tempo"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisBorderShow": false,
            "axisCenteredZero": false,
            "axisColorMode": "text",
            "axisLabel": "",
            "axisPlacement": "auto",
            "barAlignment": 0,
            "barWidthFactor": 0.6,
            "drawStyle": "line",
            "fillOpacity": 0,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "insertNulls": false,
            "lineInterpolation": "linear",
            "lineWidth": 1,
            "pointSize": 5,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "none"
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green"
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          }
        },
        "overrides": []
      },
      "gridPos": {
        "h": 8,
        "w": 12,
        "x": 0,
        "y": 0
      },
      "id": 3,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "list",
          "placement": "bottom",
          "showLegend": true
        },
        "tooltip": {
          "hideZeros": false,
          "mode": "single",
          "sort": "none"
        }
      },
      "pluginVersion": "12.0.0",
      "targets": [
        {
          "limit": 20,
          "metricsQueryType": "range",
          "query": "{ status = error } | rate() by (event.feature_flag.key) ",
          "queryType": "traceql",
          "refId": "A",
          "tableType": "traces"
        },
        {
          "datasource": {
            "type": "tempo",
            "uid": "tempo"
          },
          "hide": false,
          "limit": 20,
          "metricsQueryType": "range",
          "query": "{ status = error } | rate()",
          "queryType": "traceql",
          "refId": "B",
          "tableType": "traces"
        }
      ],
      "title": "Error",
      "type": "timeseries"
    },
    {
      "datasource": {
        "type": "tempo",
        "uid": "tempo"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisBorderShow": false,
            "axisCenteredZero": false,
            "axisColorMode": "text",
            "axisLabel": "",
            "axisPlacement": "auto",
            "barAlignment": 0,
            "barWidthFactor": 0.6,
            "drawStyle": "line",
            "fillOpacity": 0,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "insertNulls": false,
            "lineInterpolation": "linear",
            "lineWidth": 1,
            "pointSize": 5,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "none"
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green"
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          }
        },
        "overrides": []
      },
      "gridPos": {
        "h": 8,
        "w": 12,
        "x": 0,
        "y": 8
      },
      "id": 2,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "list",
          "placement": "bottom",
          "showLegend": true
        },
        "tooltip": {
          "hideZeros": false,
          "mode": "single",
          "sort": "none"
        }
      },
      "pluginVersion": "12.0.0",
      "targets": [
        {
          "limit": 20,
          "metricsQueryType": "range",
          "query": "{ } | rate() by (event.feature_flag.key) ",
          "queryType": "traceql",
          "refId": "A",
          "tableType": "traces"
        },
        {
          "datasource": {
            "type": "tempo",
            "uid": "tempo"
          },
          "hide": false,
          "limit": 20,
          "metricsQueryType": "range",
          "query": "{ } | rate()",
          "queryType": "traceql",
          "refId": "B",
          "tableType": "traces"
        }
      ],
      "title": "Rate",
      "type": "timeseries"
    },
    {
      "datasource": {
        "type": "tempo",
        "uid": "tempo"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisBorderShow": false,
            "axisCenteredZero": false,
            "axisColorMode": "text",
            "axisLabel": "",
            "axisPlacement": "auto",
            "barAlignment": 0,
            "barWidthFactor": 0.6,
            "drawStyle": "line",
            "fillOpacity": 10,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "insertNulls": false,
            "lineInterpolation": "smooth",
            "lineWidth": 2,
            "pointSize": 5,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "none"
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "fieldMinMax": false,
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green"
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          }
        },
        "overrides": []
      },
      "gridPos": {
        "h": 8,
        "w": 12,
        "x": 0,
        "y": 16
      },
      "id": 1,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "list",
          "placement": "bottom",
          "showLegend": true
        },
        "tooltip": {
          "hideZeros": false,
          "mode": "single",
          "sort": "none"
        }
      },
      "pluginVersion": "12.0.0",
      "targets": [
        {
          "datasource": {
            "type": "tempo",
            "uid": "tempo"
          },
          "filters": [
            {
              "id": "ad2a0b52",
              "operator": "=",
              "scope": "event",
              "tag": "feature_flag.variant",
              "value": [
                "false"
              ],
              "valueType": "string"
            }
          ],
          "hide": true,
          "limit": 20,
          "metricsQueryType": "range",
          "query": "{ } | avg_over_time(duration) by (event.feature_flag.key) ",
          "queryType": "traceql",
          "refId": "B",
          "tableType": "spans"
        },
        {
          "datasource": {
            "type": "tempo",
            "uid": "tempo"
          },
          "hide": false,
          "limit": 20,
          "metricsQueryType": "range",
          "query": "{ } | avg_over_time(duration)",
          "queryType": "traceql",
          "refId": "A",
          "tableType": "traces"
        },
        {
          "datasource": {
            "type": "tempo",
            "uid": "tempo"
          },
          "hide": false,
          "limit": 20,
          "metricsQueryType": "range",
          "query": "{ event.feature_flag.key != nil } | avg_over_time(duration) by (event.feature_flag.key)",
          "queryType": "traceql",
          "refId": "C",
          "tableType": "traces"
        }
      ],
      "title": "Duration",
      "transformations": [
        {
          "id": "organize",
          "options": {}
        }
      ],
      "type": "timeseries"
    }
  ],
  "preload": false,
  "schemaVersion": 41,
  "tags": [],
  "templating": {
    "list": []
  },
  "time": {
    "from": "now-30m",
    "to": "now"
  },
  "timepicker": {},
  "timezone": "browser",
  "title": "My Dashboard",
  // "uid": "gdlightfoot",
  "version": 4
}

const byVariantDashboard = {
  "annotations": {
    "list": [
      {
        "builtIn": 1,
        "datasource": {
          "type": "grafana",
          "uid": "-- Grafana --"
        },
        "enable": true,
        "hide": true,
        "iconColor": "rgba(0, 211, 255, 1)",
        "name": "Annotations & Alerts",
        "type": "dashboard"
      }
    ]
  },
  "editable": true,
  "fiscalYearStartMonth": 0,
  "graphTooltip": 0,
  // "id": 5,
  "links": [],
  "panels": [
    {
      "datasource": {
        "type": "tempo",
        "uid": "tempo"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisBorderShow": false,
            "axisCenteredZero": false,
            "axisColorMode": "text",
            "axisLabel": "",
            "axisPlacement": "auto",
            "barAlignment": 0,
            "barWidthFactor": 0.6,
            "drawStyle": "line",
            "fillOpacity": 0,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "insertNulls": false,
            "lineInterpolation": "linear",
            "lineWidth": 1,
            "pointSize": 5,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "none"
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green"
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          }
        },
        "overrides": []
      },
      "gridPos": {
        "h": 8,
        "w": 12,
        "x": 0,
        "y": 0
      },
      "id": 1,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "list",
          "placement": "bottom",
          "showLegend": true
        },
        "tooltip": {
          "hideZeros": false,
          "mode": "single",
          "sort": "none"
        }
      },
      "pluginVersion": "12.0.0",
      "targets": [
        {
          "datasource": {
            "type": "tempo",
            "uid": "tempo"
          },
          "limit": 20,
          "metricsQueryType": "range",
          "query": "{ event.feature_flag.key = \"$feature_flag_key\" } | rate() by (event.feature_flag.variant)",
          "queryType": "traceql",
          "refId": "A",
          "tableType": "traces"
        }
      ],
      "title": "Rate by variant",
      "type": "timeseries"
    },
    {
      "datasource": {
        "type": "tempo",
        "uid": "tempo"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisBorderShow": false,
            "axisCenteredZero": false,
            "axisColorMode": "text",
            "axisLabel": "",
            "axisPlacement": "auto",
            "barAlignment": 0,
            "barWidthFactor": 0.6,
            "drawStyle": "line",
            "fillOpacity": 0,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "insertNulls": false,
            "lineInterpolation": "linear",
            "lineWidth": 1,
            "pointSize": 5,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "none"
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green"
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          }
        },
        "overrides": []
      },
      "gridPos": {
        "h": 8,
        "w": 12,
        "x": 0,
        "y": 8
      },
      "id": 2,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "list",
          "placement": "bottom",
          "showLegend": true
        },
        "tooltip": {
          "hideZeros": false,
          "mode": "single",
          "sort": "none"
        }
      },
      "pluginVersion": "12.0.0",
      "targets": [
        {
          "limit": 20,
          "metricsQueryType": "range",
          "query": "{ event.feature_flag.key = \"$feature_flag_key\" && status = error } | rate() by (event.feature_flag.variant)",
          "queryType": "traceql",
          "refId": "A",
          "tableType": "traces"
        }
      ],
      "title": "Error by variant",
      "type": "timeseries"
    },
    {
      "datasource": {
        "type": "tempo",
        "uid": "tempo"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisBorderShow": false,
            "axisCenteredZero": false,
            "axisColorMode": "text",
            "axisLabel": "",
            "axisPlacement": "auto",
            "barAlignment": 0,
            "barWidthFactor": 0.6,
            "drawStyle": "line",
            "fillOpacity": 0,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "insertNulls": false,
            "lineInterpolation": "linear",
            "lineWidth": 1,
            "pointSize": 5,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "none"
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green"
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          }
        },
        "overrides": []
      },
      "gridPos": {
        "h": 8,
        "w": 12,
        "x": 0,
        "y": 16
      },
      "id": 3,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "list",
          "placement": "bottom",
          "showLegend": true
        },
        "tooltip": {
          "hideZeros": false,
          "mode": "single",
          "sort": "none"
        }
      },
      "pluginVersion": "12.0.0",
      "targets": [
        {
          "limit": 20,
          "metricsQueryType": "range",
          "query": "{ event.feature_flag.key = \"$feature_flag_key\" } | avg_over_time(duration) by (event.feature_flag.variant)",
          "queryType": "traceql",
          "refId": "A",
          "tableType": "traces"
        }
      ],
      "title": "Duration by variant",
      "type": "timeseries"
    }
  ],
  "preload": false,
  "schemaVersion": 41,
  "tags": [],
  "templating": {
    "list": [
      {
        "current": {
          "text": "featured-park",
          "value": "featured-park"
        },
        "label": "Feature Flag Key",
        "name": "feature_flag_key",
        "options": [
          {
            "selected": true,
            "text": "featured-park",
            "value": "featured-park"
          }
        ],
        "query": "featured-park",
        "type": "textbox"
      }
    ]
  },
  "time": {
    "from": "now-5m",
    "to": "now"
  },
  "timepicker": {},
  "timezone": "browser",
  "title": "RED by variant",
  // "uid": "f1ff6c6a-f84c-4c53-add9-afbbc89a4ea3",
  "version": 8
}

export const redDashboardBody = {
  "metadata": metadata,
  "spec": dashboardSpec3
}

export const byVariantDashboardBody = {
  "metadata": {...metadata, name: 'gdflaglightfoot'},
  "spec": byVariantDashboard
}