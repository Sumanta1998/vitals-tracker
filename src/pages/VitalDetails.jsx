import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const vitalConfigs = {
  "heart-rate": {
    title: "Heart Rate",
    dataKey: "heartRate",
    unit: "BPM",
    color: "#dc2626",
    normalRange: { min: 60, max: 100 },
  },
  "blood-pressure": {
    title: "Blood Pressure",
    dataKeys: ["systolic", "diastolic"],
    unit: "mmHg",
    colors: ["#dc2626", "#7c3aed"],
    normalRange: {
      systolic: { min: 90, max: 120 },
      diastolic: { min: 60, max: 80 },
    },
  },
  temperature: {
    title: "Temperature",
    dataKey: "temperature",
    unit: "°F",
    color: "#ea580c",
    normalRange: { min: 97, max: 99 },
  },
  "blood-sugar": {
    title: "Blood Sugar",
    dataKey: "bloodGlucose",
    unit: "mg/dL",
    color: "#7c3aed",
    normalRange: { min: 70, max: 140 },
  },
  "oxygen-level": {
    title: "Oxygen Level",
    dataKey: "pulseOx",
    unit: "%",
    color: "#0891b2",
    normalRange: { min: 95, max: 100 },
  },
  weight: {
    title: "Weight",
    dataKey: "weight",
    unit: "kg",
    color: "#4f46e5",
    normalRange: null,
  },
};

export default function VitalDetails() {
  const { type } = useParams();
  const navigate = useNavigate();
  const { vitalsData } = useSelector((state) => state.vitals);

  const config = vitalConfigs[type];

  if (!config) {
    return <div>Invalid vital type</div>;
  }

  const chartData = useMemo(() => {
    return (
      vitalsData
        .slice()
        // .reverse()
        .map((entry) => ({
          ...entry,
          date: new Date(entry.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
        }))
    );
  }, [vitalsData]);

  const latestValue = vitalsData[0];
  const previousValue = vitalsData[1];

  const getTrend = () => {
    if (!latestValue || !previousValue) return null;

    let current, previous;

    if (type === "blood-pressure") {
      current = latestValue.systolic;
      previous = previousValue.systolic;
    } else {
      current = latestValue[config.dataKey];
      previous = previousValue[config.dataKey];
    }

    if (current > previous) return "up";
    if (current < previous) return "down";
    return "stable";
  };

  const trend = getTrend();
  const trendIcons = {
    up: <TrendingUp className="h-4 w-4 text-red-500" />,
    down: <TrendingDown className="h-4 w-4 text-green-500" />,
    stable: <Minus className="h-4 w-4 text-gray-500" />,
  };

  const getStatusColor = (value) => {
    if (!config.normalRange) return "text-gray-900";

    if (type === "blood-pressure") {
      const systolic = latestValue?.systolic;
      const diastolic = latestValue?.diastolic;
      const sysNormal =
        systolic >= config.normalRange.systolic.min &&
        systolic <= config.normalRange.systolic.max;
      const diaNormal =
        diastolic >= config.normalRange.diastolic.min &&
        diastolic <= config.normalRange.diastolic.max;
      return sysNormal && diaNormal ? "text-green-600" : "text-red-600";
    }

    const isNormal =
      value >= config.normalRange.min && value <= config.normalRange.max;
    return isNormal ? "text-green-600" : "text-red-600";
  };

  const stats = useMemo(() => {
    if (!vitalsData.length) return null;

    let values;
    if (type === "blood-pressure") {
      values = vitalsData.map((entry) => entry.systolic);
    } else {
      values = vitalsData.map((entry) => entry[config.dataKey]).filter(Boolean);
    }

    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);

    return { min, avg, max };
  }, [vitalsData, type]);

  const renderChart = () => {
    if (type === "blood-pressure") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="systolic"
              stroke={config.colors[0]}
              strokeWidth={2}
              name="Systolic"
            />
            <Line
              type="monotone"
              dataKey="diastolic"
              stroke={config.colors[1]}
              strokeWidth={2}
              name="Diastolic"
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={config.dataKey}
            stroke={config.color}
            strokeWidth={2}
            name={config.title}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const getCurrentValue = () => {
    if (!latestValue) return "N/A";

    if (type === "blood-pressure") {
      return `${latestValue.systolic}/${latestValue.diastolic}`;
    }

    return latestValue[config.dataKey];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {config.title} Details
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Current Reading
          </h3>
          <div
            className={`text-3xl font-bold mb-2 ${getStatusColor(
              getCurrentValue()
            )}`}
          >
            {getCurrentValue()}{" "}
            <span className="text-lg font-normal text-gray-500">
              {config.unit}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {trend && trendIcons[trend]}
            <span className="text-sm text-gray-600">
              {trend === "up"
                ? "Increased"
                : trend === "down"
                ? "Decreased"
                : "Stable"}{" "}
              from last reading
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Last Updated
          </h3>
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {latestValue?.date || "N/A"}
          </div>
          {/* <div className="text-sm text-gray-600">6:30 PM</div> */}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Normal Range
          </h3>
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {config.normalRange
              ? type === "blood-pressure"
                ? `${config.normalRange.systolic.min}-${config.normalRange.systolic.max}/${config.normalRange.diastolic.min}-${config.normalRange.diastolic.max}`
                : `${config.normalRange.min}-${config.normalRange.max}`
              : "Individual"}
          </div>
          <div className="text-sm text-gray-600">{config.unit}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {config.title} Trend
        </h3>

        {stats && (
          <div className="flex justify-between text-center mb-6">
            <div className="flex-1">
              <div className="text-green-600 font-semibold text-lg">
                {stats.min}
              </div>
              <div className="text-gray-500 text-sm">Min</div>
            </div>
            <div className="flex-1">
              <div className="text-green-600 font-semibold text-lg">
                {stats.avg}
              </div>
              <div className="text-gray-500 text-sm">Average</div>
            </div>
            <div className="flex-1">
              <div className="text-green-600 font-semibold text-lg">
                {stats.max}
              </div>
              <div className="text-gray-500 text-sm">Max</div>
            </div>
          </div>
        )}

        {renderChart()}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Readings
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {config.title}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vitalsData
                .slice()
                .reverse()
                .map((entry) => {
                  const value =
                    type === "blood-pressure"
                      ? `${entry.systolic}/${entry.diastolic}`
                      : entry[config.dataKey];

                  return (
                    <tr
                      key={entry.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {entry.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {value} {config.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            getStatusColor(value).includes("green")
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {getStatusColor(value).includes("green")
                            ? "Normal"
                            : "Abnormal"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
