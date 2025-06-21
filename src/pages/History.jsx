import { useSelector } from "react-redux";
import { VitalsChart } from "../components/VitalsChart";
import { Calendar } from "lucide-react";
import VitalsDashboard from "../components/VitalsDashboard";
import { useMemo, useState } from "react";

export default function History() {
  const { vitalsData } = useSelector((state) => state.vitals);
  const chartData = vitalsData.slice();

  const [selectedDate, setSelectedDate] = useState("");

  const filteredData = useMemo(() => {
    if (!selectedDate) return vitalsData;
    return vitalsData.filter((entry) => entry.date === selectedDate);
  }, [vitalsData, selectedDate]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Vitals History</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <div className="flex items-center gap-2">
            <label
              htmlFor="date-filter"
              className="text-sm font-medium text-gray-700"
            >
              Choose Date
            </label>
            <input
              id="date-filter"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {selectedDate && (
              <button
                onClick={() => setSelectedDate("")}
                className="text-blue-600 text-xs hover:underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <VitalsDashboard
        filteredData={filteredData}
        selectedDate={selectedDate}
      />

      {!selectedDate && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VitalsChart
            title="Weight & BMI Trend"
            data={chartData}
            lines={[
              { dataKey: "weight", color: "#8b5cf6", name: "Weight (kg)" },
              { dataKey: "bmi", color: "#06b6d4", name: "BMI" },
            ]}
          />
          <VitalsChart
            title="Temperature & Glucose"
            data={chartData}
            lines={[
              {
                dataKey: "temperature",
                color: "#dc2626",
                name: "Temperature (°F)",
              },
              {
                dataKey: "bloodGlucose",
                color: "#059669",
                name: "Blood Glucose (mg/dL)",
              },
            ]}
          />
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            {selectedDate ? `Entries for ${selectedDate}` : "Recent Entries"}
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
                  Heart Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blood Pressure
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SpO₂
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Weight
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  BMI
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((entry) => (
                <tr
                  key={entry.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.heartRate} BPM
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.systolic}/{entry.diastolic}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.pulseOx}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.weight} kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.bmi}
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-4 text-gray-500 text-sm"
                  >
                    No data found for the selected date.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
