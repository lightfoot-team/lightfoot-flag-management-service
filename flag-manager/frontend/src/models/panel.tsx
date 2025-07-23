export const durationPanel = {
  "id": 2,
  "type": "timeseries",
  "title": "Duration",
  "gridPos": {
    "x": 0,
    "y": 16,
    "h": 8,
    "w": 12
  },
  "fieldConfig": {
    "defaults": {
      "custom": {
        "drawStyle": "line",
        "lineInterpolation": "linear",
        "barAlignment": 0,
        "barWidthFactor": 0.6,
        "lineWidth": 1,
        "fillOpacity": 0,
        "gradientMode": "none",
        "spanNulls": false,
        "insertNulls": false,
        "showPoints": "auto",
        "pointSize": 5,
        "stacking": {
          "mode": "none",
          "group": "A"
        },
        "axisPlacement": "auto",
        "axisLabel": "",
        "axisColorMode": "text",
        "axisBorderShow": false,
        "scaleDistribution": {
          "type": "linear"
        },
        "axisCenteredZero": false,
        "hideFrom": {
          "tooltip": false,
          "viz": false,
          "legend": false
        },
        "thresholdsStyle": {
          "mode": "off"
        }
      },
      "color": {
        "mode": "palette-classic"
      },
      "mappings": [],
      "thresholds": {
        "mode": "absolute",
        "steps": [
          {
            "color": "green",
            "value": null
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
  "pluginVersion": "12.0.0",
  "targets": [
    {
      "filters": [
        {
          "id": "1431e672",
          "operator": "=",
          "scope": "span",
          "value": []
        },
        {
          "id": "min-duration",
          "operator": ">",
          "tag": "duration",
          "value": "0",
          "valueType": "duration"
        }
      ],
      "limit": 20,
      "metricsQueryType": "range",
      "query": "{event.feature_flag.key = \"$feature_flag_key_2\"} | avg_over_time(duration)",
      "queryType": "traceql",
      "refId": "A",
      "tableType": "traces"
    },
    {
      "datasource": {
        "uid": "tempo",
        "type": "tempo"
      },
      "refId": "B",
      "hide": false,
      "queryType": "traceql",
      "limit": 20,
      "tableType": "traces",
      "metricsQueryType": "range",
      "query": "{ } | avg_over_time(duration)"
    },
    {
      "datasource": {
        "uid": "tempo",
        "type": "tempo"
      },
      "refId": "C",
      "hide": false,
      "queryType": "traceql",
      "limit": 20,
      "tableType": "traces",
      "metricsQueryType": "range",
      "query": "{ } | max_over_time(duration)"
    }
  ],
  "datasource": {
    "type": "tempo",
    "uid": "tempo"
  },
  "options": {
    "tooltip": {
      "mode": "single",
      "sort": "none",
      "hideZeros": false
    },
    "legend": {
      "showLegend": true,
      "displayMode": "list",
      "placement": "bottom",
      "calcs": []
    }
  }
}

export const ratePanel = {
  "id": 3,
  "type": "timeseries",
  "title": "Rate",
  "gridPos": {
    "x": 0,
    "y": 8,
    "h": 8,
    "w": 12
  },
  "fieldConfig": {
    "defaults": {
      "custom": {
        "drawStyle": "line",
        "lineInterpolation": "linear",
        "barAlignment": 0,
        "barWidthFactor": 0.6,
        "lineWidth": 1,
        "fillOpacity": 10,
        "gradientMode": "none",
        "spanNulls": false,
        "insertNulls": false,
        "showPoints": "auto",
        "pointSize": 5,
        "stacking": {
          "mode": "none",
          "group": "A"
        },
        "axisPlacement": "auto",
        "axisLabel": "",
        "axisColorMode": "text",
        "axisBorderShow": false,
        "scaleDistribution": {
          "type": "linear"
        },
        "axisCenteredZero": false,
        "hideFrom": {
          "tooltip": false,
          "viz": false,
          "legend": false
        },
        "thresholdsStyle": {
          "mode": "off"
        }
      },
      "color": {
        "mode": "palette-classic"
      },
      "mappings": [],
      "thresholds": {
        "mode": "absolute",
        "steps": [
          {
            "color": "green",
            "value": null
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
  "pluginVersion": "12.0.0",
  "targets": [
    {
      "limit": 20,
      "metricsQueryType": "range",
      "query": "{ event.feature_flag.key = \"${feature_flag_key_2}\" } | rate()",
      "queryType": "traceql",
      "refId": "A",
      "tableType": "traces"
    },
    {
      "datasource": {
        "uid": "tempo",
        "type": "tempo"
      },
      "refId": "B",
      "hide": false,
      "queryType": "traceql",
      "limit": 20,
      "tableType": "traces",
      "metricsQueryType": "range",
      "query": "{ } | rate()"
    }
  ],
  "datasource": {
    "type": "tempo",
    "uid": "tempo"
  },
  "options": {
    "tooltip": {
      "mode": "single",
      "sort": "none",
      "hideZeros": false
    },
    "legend": {
      "showLegend": true,
      "displayMode": "list",
      "placement": "bottom",
      "calcs": []
    }
  }
}

export const errorPanel = {
  "id": 4,
  "type": "timeseries",
  "title": "Errors",
  "gridPos": {
    "x": 0,
    "y": 0,
    "h": 8,
    "w": 12
  },
  "fieldConfig": {
    "defaults": {
      "custom": {
        "drawStyle": "line",
        "lineInterpolation": "linear",
        "barAlignment": 0,
        "barWidthFactor": 0.6,
        "lineWidth": 1,
        "fillOpacity": 10,
        "gradientMode": "none",
        "spanNulls": false,
        "insertNulls": false,
        "showPoints": "auto",
        "pointSize": 5,
        "stacking": {
          "mode": "none",
          "group": "A"
        },
        "axisPlacement": "auto",
        "axisLabel": "",
        "axisColorMode": "text",
        "axisBorderShow": false,
        "scaleDistribution": {
          "type": "linear"
        },
        "axisCenteredZero": false,
        "hideFrom": {
          "tooltip": false,
          "viz": false,
          "legend": false
        },
        "thresholdsStyle": {
          "mode": "off"
        }
      },
      "color": {
        "mode": "palette-classic"
      },
      "mappings": [],
      "thresholds": {
        "mode": "absolute",
        "steps": [
          {
            "color": "green",
            "value": null
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
  "pluginVersion": "12.0.0",
  "targets": [
    {
      "limit": 20,
      "metricsQueryType": "range",
      "query": "{ event.feature_flag.key = \"${feature_flag_key}\" && (span.http.status_code >= 400 || status = error)} | rate()",
      "queryType": "traceql",
      "refId": "A",
      "tableType": "traces"
    },
    {
      "datasource": {
        "uid": "tempo",
        "type": "tempo"
      },
      "refId": "B",
      "hide": false,
      "queryType": "traceql",
      "limit": 20,
      "tableType": "traces",
      "metricsQueryType": "range",
      "query": "{ span.http.status_code >= 400 || status = error} | rate()"
    }
  ],
  "datasource": {
    "type": "tempo",
    "uid": "tempo"
  },
  "options": {
    "tooltip": {
      "mode": "single",
      "sort": "none",
      "hideZeros": false
    },
    "legend": {
      "showLegend": true,
      "displayMode": "list",
      "placement": "bottom",
      "calcs": []
    }
  }
}