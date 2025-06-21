import { useState } from "react";
import { AddVitalsModal } from "../components/AddVitalsModal";
import { VitalsCard } from "../components/VitalsCard";
import { VitalsChart } from "../components/VitalsChart";
import { Activity, Droplets, Heart, Plus, Scale } from "lucide-react";
import { useSelector } from "react-redux";
import FloatingActionButton from "../components/FloatingActionButton";
import { useOutletContext } from "react-router-dom";

export default function Dashboard() {
  const { setShowAddModal } = useOutletContext(); // 👈 Access from context

  const { vitalsData, alerts } = useSelector((state) => state.vitals);

  // const [showAddModal, setShowAddModal] = useState(false);
  const latest = vitalsData[0];

  // const chartData = vitalsData.slice().reverse();
  const chartData = vitalsData.slice();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Overview of Vitals</h1>
        {/* <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Vitals
        </button> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <VitalsCard
          title="Heart Rate"
          value={latest.heartRate || "--"}
          unit="BPM"
          icon={Heart}
          color="red"
        />
        <VitalsCard
          title="Blood Pressure"
          value={
            latest.systolic && latest.diastolic
              ? `${latest.systolic}/${latest.diastolic}`
              : "--"
          }
          unit="mmHg"
          icon={Activity}
          color="blue"
        />
        <VitalsCard
          title="Oxygen Level"
          value={latest.pulseOx || "--"}
          unit="SpO₂%"
          icon={Droplets}
          color="green"
        />
        <VitalsCard
          title="Weight"
          value={latest.weight || "--"}
          unit="kg"
          icon={Scale}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VitalsChart
          title="Blood Pressure Trend"
          data={chartData}
          lines={[
            { dataKey: "systolic", color: "#ef4444", name: "Systolic" },
            { dataKey: "diastolic", color: "#3b82f6", name: "Diastolic" },
          ]}
        />
        <VitalsChart
          title="Heart Rate & SpO₂"
          data={chartData}
          lines={[
            {
              dataKey: "heartRate",
              color: "#f59e0b",
              name: "Heart Rate (BPM)",
            },
            { dataKey: "pulseOx", color: "#10b981", name: "SpO₂ (%)" },
          ]}
        />
      </div>
      <FloatingActionButton onClick={() => setShowAddModal(true)} />

      {/* <AddVitalsModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      /> */}
    </div>
  );
}
