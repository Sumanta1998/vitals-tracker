import { CheckCircle, TrendingUp } from "lucide-react";
import { useSelector } from "react-redux";
import { AlertCard } from "../components/AlertCard";

export default function Alerts() {
  const { alerts } = useSelector((state) => state.vitals);

  const healthTips = [
    {
      title: "Heart Health",
      content:
        "Regular exercise and a balanced diet help maintain healthy heart rate and blood pressure.",
      color: "blue",
    },
    {
      title: "Weight Management",
      content:
        "Monitor your BMI regularly and maintain it within the healthy range of 18.5-24.9.",
      color: "green",
    },
    {
      title: "Blood Sugar",
      content:
        "Keep blood glucose levels stable through consistent meal timing and portion control.",
      color: "purple",
    },
    {
      title: "Hydration",
      content:
        "Stay well-hydrated to support optimal blood pressure and overall circulation.",
      color: "orange",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Smart Alerts</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <TrendingUp className="h-4 w-4" />
          AI-powered health insights
        </div>
      </div>

      {alerts.length > 0 ? (
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <AlertCard key={index} alert={alert} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <CheckCircle className="mx-auto h-12 w-12 text-green-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            All vitals are normal
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            No alerts or warnings detected from your recent vitals.
          </p>
        </div>
      )}

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Health Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {healthTips.map((tip, index) => (
            <div key={index} className={`p-4 bg-${tip.color}-50 rounded-lg`}>
              <h4 className={`font-medium text-${tip.color}-900 mb-2`}>
                {tip.title}
              </h4>
              <p className={`text-sm text-${tip.color}-700`}>{tip.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
