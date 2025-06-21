import { AlertTriangle } from "lucide-react";

export const AlertCard = ({ alert, index }) => (
  <div
    key={index}
    className={`rounded-xl p-6 border-l-4 ${
      alert.type === "danger"
        ? "bg-red-50 border-red-400"
        : "bg-yellow-50 border-yellow-400"
    }`}
  >
    <div className="flex items-start">
      <div className="flex-shrink-0">
        <AlertTriangle
          className={`h-5 w-5 ${
            alert.type === "danger" ? "text-red-400" : "text-yellow-400"
          }`}
        />
      </div>
      <div className="ml-3 flex-1">
        <h3
          className={`text-sm font-medium ${
            alert.type === "danger" ? "text-red-800" : "text-yellow-800"
          }`}
        >
          {alert.message}
        </h3>
        <div
          className={`mt-2 text-sm ${
            alert.type === "danger" ? "text-red-700" : "text-yellow-700"
          }`}
        >
          <p>
            <strong>Recommendation:</strong> {alert.recommendation}
          </p>
        </div>
      </div>
    </div>
  </div>
);
