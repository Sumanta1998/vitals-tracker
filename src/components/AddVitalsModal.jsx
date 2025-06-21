import { useState } from "react";
import { Modal } from "./Modal";
import { FormInput } from "./FormInput";
import { useDispatch } from "react-redux";
import { addVitals } from "../redux/vitalsSlice";
import {
  X,
  User,
  Weight,
  Thermometer,
  Wind,
  Activity,
  Heart,
  Droplet,
} from "lucide-react";

export const AddVitalsModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    respirationRate: "",
    temperature: "",
    systolic: "",
    diastolic: "",
    pulseOx: "",
    bloodGlucose: "",
    heartRate: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const isEmpty = Object.values(formData).some((value) => value === "");

    if (isEmpty) {
      alert("Please fill in all fields before saving."); // Replace with toast if needed
      return;
    }
    dispatch(addVitals(formData));
    setFormData({
      height: "",
      weight: "",
      respirationRate: "",
      temperature: "",
      systolic: "",
      diastolic: "",
      pulseOx: "",
      bloodGlucose: "",
      heartRate: "",
    });
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      height: "",
      weight: "",
      respirationRate: "",
      temperature: "",
      systolic: "",
      diastolic: "",
      pulseOx: "",
      bloodGlucose: "",
      heartRate: "",
    });
    onClose();
  };

  const footer = (
    <>
      <button
        onClick={onClose}
        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
      >
        Cancel
      </button>
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Save Vitals
      </button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Vitals"
      footer={footer}
    >
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormInput
            label="Height"
            type="number"
            value={formData.height}
            onChange={(e) => handleInputChange("height", e.target.value)}
            placeholder="Enter Height"
            unit="cm"
            icon={User}
          />
          <FormInput
            label="Weight"
            type="number"
            value={formData.weight}
            onChange={(e) => handleInputChange("weight", e.target.value)}
            placeholder="Enter Weight"
            unit="kg"
            icon={Weight}
          />
          <FormInput
            label="Temperature"
            type="number"
            step="0.1"
            value={formData.temperature}
            onChange={(e) => handleInputChange("temperature", e.target.value)}
            placeholder="Enter Temperature"
            unit="°F"
            icon={Thermometer}
          />

          <FormInput
            label="Respiration Rate"
            type="number"
            value={formData.respirationRate}
            onChange={(e) =>
              handleInputChange("respirationRate", e.target.value)
            }
            placeholder="Enter Respiration rate"
            unit="breaths/min"
            icon={Wind}
          />
          <FormInput
            label="Blood Pressure (SYS)"
            type="number"
            value={formData.systolic}
            onChange={(e) => handleInputChange("systolic", e.target.value)}
            placeholder="Enter Systolic"
            unit="mmHg"
            icon={Activity}
          />
          <FormInput
            label="Blood Pressure (DIA)"
            type="number"
            value={formData.diastolic}
            onChange={(e) => handleInputChange("diastolic", e.target.value)}
            placeholder="Enter diastolic"
            unit="mmHg"
            icon={Activity}
          />

          <FormInput
            label="Pulse Ox"
            type="number"
            value={formData.pulseOx}
            onChange={(e) => handleInputChange("pulseOx", e.target.value)}
            placeholder="Enter Pulse"
            unit="%"
            icon={Heart}
          />
          <FormInput
            label="Heart Rate"
            type="number"
            value={formData.heartRate}
            onChange={(e) => handleInputChange("heartRate", e.target.value)}
            placeholder="Enter heart rate"
            unit="Beats/min"
            icon={Heart}
          />
          <FormInput
            label="Blood Glucose"
            type="number"
            value={formData.bloodGlucose}
            onChange={(e) => handleInputChange("bloodGlucose", e.target.value)}
            placeholder="Please enter your Glucose"
            unit="mg/dL"
            icon={Droplet}
          />
        </div>
      </div>
    </Modal>
  );
};
