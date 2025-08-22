const metadata = {
  "name": "red-lightfoot",
  "annotations": {
    "namespace": "default",
  }
};

const byKeyDashboard = {
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
            "axisLabel": "spans/sec",
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
        "overrides": [
          {
            "matcher": {
              "id": "byName",
              "options": "rate"
            },
            "properties": [
              {
                "id": "displayName",
                "value": "All"
              }
            ]
          }
        ]
      },
      "gridPos": {
        "h": 8,
        "w": 12,
        "x": 0,
        "y": 0
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
          "query": "{ name != \"dns.lookup\" && event.feature_flag.value != false} | rate() by (event.feature_flag.key) ",
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
          "query": "{ name != \"dns.lookup\" } | rate()",
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
            "axisLabel": "errors/sec",
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
        "overrides": [
          {
            "matcher": {
              "id": "byName",
              "options": "nil"
            },
            "properties": [
              {
                "id": "displayName",
                "value": "None"
              }
            ]
          },
          {
            "__systemRef": "hideSeriesFrom",
            "matcher": {
              "id": "byNames",
              "options": {
                "mode": "exclude",
                "names": [
                  "errors-feature-flag"
                ],
                "prefix": "All except:",
                "readOnly": true
              }
            },
            "properties": [
              {
                "id": "custom.hideFrom",
                "value": {
                  "legend": false,
                  "tooltip": false,
                  "viz": true
                }
              }
            ]
          }
        ]
      },
      "gridPos": {
        "h": 8,
        "w": 12,
        "x": 0,
        "y": 8
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
          "query": "{ status = error }| rate() by (event.feature_flag.key) ",
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
          "query": "{ status = error && name != \"dns.lookup\"} | rate()",
          "queryType": "traceql",
          "refId": "B",
          "tableType": "traces"
        }
      ],
      "title": "Error",
      "transformations": [
        {
          "id": "renameByRegex",
          "options": {
            "regex": "rate",
            "renamePattern": "All"
          }
        }
      ],
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
            "axisLabel": "p95 span duration (ms)",
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
        "overrides": [
          {
            "matcher": {
              "id": "byFrameRefID",
              "options": "0.95"
            },
            "properties": [
              {
                "id": "displayName",
                "value": "All"
              }
            ]
          }
        ]
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
          "query": "{ name != \"dns.lookup\" && event.feature_flag.variant != \"false\"} | quantile_over_time(duration, 0.95) by (event.feature_flag.key)",
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
          "query": "{ name != \"dns.lookup\"} | quantile_over_time(duration, 0.95)",
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
          "query": "{ event.feature_flag.key != nil && name != \"dns.lookup\" } | quantile_over_time(duration, 0.95) by (event.feature_flag.key)",
          "queryType": "traceql",
          "refId": "C",
          "tableType": "traces"
        }
      ],
      "title": "Duration",
      "transformations": [
        {
          "id": "renameByRegex",
          "options": {
            "regex": "^\\{.*event\\.feature_flag\\.key=\"([^\"]+)\".*\\}$",
            "renamePattern": "$1"
          }
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
    "from": "now-5m",
    "to": "now"
  },
  "timepicker": {},
  "timezone": "browser",
  "title": "RED Overview",
  "version": 2
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
            "axisLabel": "spans/sec",
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
          "query": "{ event.feature_flag.key = \"$feature_flag_key\" && name != \"dns.lookup\" } | rate() by (event.feature_flag.value)",
          "queryType": "traceql",
          "refId": "A",
          "tableType": "traces"
        }
      ],
      "title": "Rate by variant",
      "transformations": [
        {
          "id": "renameByRegex",
          "options": {
            "regex": ".*value=([^,}]+).*",
            "renamePattern": "$1"
          }
        }
      ],
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
            "axisLabel": "errors/sec",
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
          "query": "{ event.feature_flag.key = \"$feature_flag_key\" && status = error && name != \"dns.lookup\" } | rate() by (event.feature_flag.value)",
          "queryType": "traceql",
          "refId": "A",
          "tableType": "traces"
        }
      ],
      "title": "Error by variant",
      "transformations": [
        {
          "id": "renameByRegex",
          "options": {
            "regex": ".*value=([^,}]+).*",
            "renamePattern": "$1"
          }
        }
      ],
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
            "axisLabel": "P95 Duration (ms)",
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
          "query": "{ event.feature_flag.key = \"$feature_flag_key\" && name != \"dns.lookup\" } | quantile_over_time(duration, 0.95) by (event.feature_flag.value)",
          "queryType": "traceql",
          "refId": "A",
          "tableType": "traces"
        }
      ],
      "title": "Duration by variant",
      "transformations": [
        {
          "id": "renameByRegex",
          "options": {
            "regex": ".*value=([^,}]+).*",
            "renamePattern": "$1"
          }
        }
      ],
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
          "text": "duration-feature-flag",
          "value": "duration-feature-flag"
        },
        "label": "Feature Flag Key",
        "name": "feature_flag_key",
        "options": [
          {
            "selected": true,
            "text": "duration-feature-flag",
            "value": "duration-feature-flag"
          }
        ],
        "query": "duration-feature-flag",
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
  "title": "RED by Variant",
  "version": 5
}

const byKeyFrontendDashboard = {
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
            "axisLabel": "Avg Over Time (ms)",
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
          "datasource": {
            "type": "tempo",
            "uid": "tempo"
          },
          "hide": false,
          "limit": 20,
          "metricsQueryType": "range",
          "query": "{event.feature_flag.key != nil} | avg_over_time(span.cls.value) by (event.feature_flag.key)",
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
          "query": "{} | avg_over_time(span.cls.value)",
          "queryType": "traceql",
          "refId": "B",
          "tableType": "traces"
        }
      ],
      "title": "Visual Stability (CLS)",
      "transformations": [
        {
          "id": "renameByRegex",
          "options": {
            "regex": "avg_over_time",
            "renamePattern": "All"
          }
        }
      ],
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
            "axisLabel": "P75 Time (ms)",
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
          "hide": false,
          "limit": 20,
          "metricsQueryType": "range",
          "query": "{} | quantile_over_time(span.inp.value, 0.75)",
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
          "query": "{ event.feature_flag.key != nil} | quantile_over_time(span.inp.value, 0.75) by (event.feature_flag.key)",
          "queryType": "traceql",
          "refId": "B",
          "tableType": "traces"
        }
      ],
      "title": "Interactivity (INP)",
      "transformations": [
        {
          "id": "renameByRegex",
          "options": {
            "regex": ".*key=\"([^\"]+)\".*",
            "renamePattern": "$1"
          }
        },
        {
          "id": "renameByRegex",
          "options": {
            "regex": "^0\\.75$",
            "renamePattern": "All"
          }
        }
      ],
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
            "axisLabel": "P75 Time (ms)",
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
        "overrides": [
          {
            "__systemRef": "hideSeriesFrom",
            "matcher": {
              "id": "byNames",
              "options": {
                "mode": "exclude",
                "names": [
                  "{event.feature_flag.key=\"render-large-new-component\", p=0.75}"
                ],
                "prefix": "All except:",
                "readOnly": true
              }
            },
            "properties": [
              {
                "id": "custom.hideFrom",
                "value": {
                  "legend": false,
                  "tooltip": false,
                  "viz": true
                }
              }
            ]
          }
        ]
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
          "limit": 20,
          "metricsQueryType": "range",
          "query": "{event.feature_flag.key != nil} | quantile_over_time(span.lcp.value, 0.75) by (event.feature_flag.key)",
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
          "query": "{} | quantile_over_time(span.lcp.value, 0.75) ",
          "queryType": "traceql",
          "refId": "B",
          "tableType": "traces"
        }
      ],
      "title": "Loading (LCP)",
      "transformations": [
        {
          "id": "renameByRegex",
          "options": {
            "regex": ".*key=\"([^\"]+)\".*",
            "renamePattern": "$1"
          }
        },
        {
          "id": "renameByRegex",
          "options": {
            "regex": "^0\\.75$",
            "renamePattern": "All"
          }
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
    "from": "now-5m",
    "to": "now"
  },
  "timepicker": {},
  "timezone": "browser",
  "title": "Core Web Vitals Overview",
  "version": 4
}

const byVariantFrontendDashboard = {
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
            "axisLabel": "P75 Time (ms)",
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
        "overrides": [
          {
            "__systemRef": "hideSeriesFrom",
            "matcher": {
              "id": "byNames",
              "options": {
                "mode": "exclude",
                "names": [
                  "0.75"
                ],
                "prefix": "All except:",
                "readOnly": true
              }
            },
            "properties": [
              {
                "id": "custom.hideFrom",
                "value": {
                  "legend": false,
                  "tooltip": false,
                  "viz": true
                }
              }
            ]
          }
        ]
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
          "query": "{ event.feature_flag.key = \"$feature_flag_key\"} | quantile_over_time(span.lcp.value, 0.75) by (event.feature_flag.value)",
          "queryType": "traceql",
          "refId": "A",
          "tableType": "traces"
        }
      ],
      "title": "Loading (LCP) by Variant",
      "transformations": [
        {
          "id": "renameByRegex",
          "options": {
            "regex": ".*value=([^,]+).*",
            "renamePattern": "$1"
          }
        }
      ],
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
            "axisLabel": "Avg Over Time (ms)",
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
          "query": "{ event.feature_flag.key = \"$feature_flag_key\"} | avg_over_time(span.cls.value) by (event.feature_flag.value)",
          "queryType": "traceql",
          "refId": "A",
          "tableType": "traces"
        }
      ],
      "title": "Visual Stability (CLS) by Variant",
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
            "axisLabel": "P75 Time (ms)",
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
          "query": "{ event.feature_flag.key = \"$feature_flag_key\"} | quantile_over_time(span.inp.value, 0.75) by (event.feature_flag.value)",
          "queryType": "traceql",
          "refId": "A",
          "tableType": "traces"
        }
      ],
      "title": "Interactivity (INP) by Variant",
      "transformations": [
        {
          "id": "renameByRegex",
          "options": {
            "regex": ".*value=([^,]+).*",
            "renamePattern": "$1"
          }
        }
      ],
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
          "text": "fetch-large-file",
          "value": "fetch-large-file"
        },
        "label": "Feature Flag Key",
        "name": "feature_flag_key",
        "options": [
          {
            "selected": true,
            "text": "fetch-large-file",
            "value": "fetch-large-file"
          }
        ],
        "query": "fetch-large-file",
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
  "title": "Core Web Vitals by Variant",
  "version": 5
}

export const redDashboardBody = {
  "metadata": metadata,
  "spec": byKeyDashboard
}

export const byVariantDashboardBody = {
  "metadata": {...metadata, name: 'red-var-lightfoot'},
  "spec": byVariantDashboard
}

export const frontendDashboardBody = {
  "metadata": {...metadata, name: 'cwv-lightfoot'},
  "spec": byKeyFrontendDashboard
}

export const byVariantFrontendDashboardBody = {
  "metadata": {...metadata, name: 'cwv-var-lightfoot'},
  "spec": byVariantFrontendDashboard
}
