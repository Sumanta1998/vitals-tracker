import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Heart,
  Activity,
  Thermometer,
  Droplets,
  Zap,
  Weight,
} from "lucide-react";

const VitalCard = ({
  title,
  value,
  unit,
  icon: Icon,
  color,
  lastUpdated,
  onTrackProgress,
  type,
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
    </div>

    <div className="mb-4">
      <div className="text-2xl font-bold text-gray-900">
        {value}{" "}
        <span className="text-sm font-normal text-gray-500">{unit}</span>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Avg. daily {title.toLowerCase()}
      </p>
    </div>

    <div className="mb-4">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Calendar className="h-4 w-4" />
        <span>Uploaded Date and Time</span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{lastUpdated}</p>
    </div>

    <button
      onClick={() => onTrackProgress(type)}
      className="w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium cursor-pointer"
    >
      Track Progress
    </button>
  </div>
);

export default function VitalsDashboard({ filteredData, selectedDate }) {
  const navigate = useNavigate();
  // const { vitalsData } = useSelector((state) => state.vitals);
  // const [selectedDate, setSelectedDate] = useState(
  //   new Date().toISOString().split("T")[0]
  // );

  // // Filter data based on selected date
  // const filteredData = useMemo(() => {
  //   if (!selectedDate) return vitalsData;
  //   return vitalsData.filter((entry) => entry.date === selectedDate);
  // }, [vitalsData, selectedDate]);

  // Calculate averages for the filtered data
  const averages = useMemo(() => {
    if (!filteredData.length) return {};

    const totals = filteredData.reduce(
      (acc, entry) => {
        acc.heartRate += entry.heartRate || 0;
        acc.systolic += entry.systolic || 0;
        acc.diastolic += entry.diastolic || 0;
        acc.temperature += entry.temperature || 0;
        acc.bloodGlucose += entry.bloodGlucose || 0;
        acc.pulseOx += entry.pulseOx || 0;
        acc.weight += entry.weight || 0;
        return acc;
      },
      {
        heartRate: 0,
        systolic: 0,
        diastolic: 0,
        temperature: 0,
        bloodGlucose: 0,
        pulseOx: 0,
        weight: 0,
      }
    );

    const count = filteredData.length;
    return {
      heartRate: Math.round(totals.heartRate / count),
      bloodPressure: `${Math.round(totals.systolic / count)}/${Math.round(
        totals.diastolic / count
      )}`,
      temperature: (totals.temperature / count).toFixed(1),
      bloodGlucose: Math.round(totals.bloodGlucose / count),
      pulseOx: Math.round(totals.pulseOx / count),
      weight: Math.round(totals.weight / count),
    };
  }, [filteredData]);

  const handleTrackProgress = (type) => {
    navigate(`/history/${type}`);
  };

  const getLastUpdated = () => {
    if (!filteredData.length) return "No data";
    return filteredData[filteredData.length - 1].date;
  };

  return (
    <div className="space-y-6">
      {/* <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">See your Vitals</h1>
      </div> */}

      {/* {filteredData.length > 0 ? ( */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <VitalCard
          title="Heart Rate"
          value={averages.heartRate}
          unit="bpm"
          icon={Heart}
          color="bg-red-500"
          lastUpdated={getLastUpdated()}
          onTrackProgress={handleTrackProgress}
          type="heart-rate"
        />

        <VitalCard
          title="Blood Pressure"
          value={averages.bloodPressure}
          unit=""
          icon={Activity}
          color="bg-green-500"
          lastUpdated={getLastUpdated()}
          onTrackProgress={handleTrackProgress}
          type="blood-pressure"
        />

        <VitalCard
          title="Temperature"
          value={averages.temperature}
          unit="°F"
          icon={Thermometer}
          color="bg-blue-500"
          lastUpdated={getLastUpdated()}
          onTrackProgress={handleTrackProgress}
          type="temperature"
        />

        <VitalCard
          title="Blood Sugar"
          value={averages.bloodGlucose}
          unit="mg/dL"
          icon={Droplets}
          color="bg-purple-500"
          lastUpdated={getLastUpdated()}
          onTrackProgress={handleTrackProgress}
          type="blood-sugar"
        />

        <VitalCard
          title="Oxy Level"
          value={averages.pulseOx}
          unit="%"
          icon={Zap}
          color="bg-cyan-500"
          lastUpdated={getLastUpdated()}
          onTrackProgress={handleTrackProgress}
          type="oxygen-level"
        />

        <VitalCard
          title="Weight"
          value={averages.weight}
          unit="kg"
          icon={Weight}
          color="bg-indigo-500"
          lastUpdated={getLastUpdated()}
          onTrackProgress={handleTrackProgress}
          type="weight"
        />
      </div>
      {/* ) : (
        <div className="text-center text-gray-500 py-8">
          No vitals found for the selected date.
        </div>
      )} */}
    </div>
  );
}
