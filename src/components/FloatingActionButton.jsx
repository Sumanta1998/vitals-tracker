import { Plus } from "lucide-react";

const FloatingActionButton = ({ onClick, label = "Add Vitals" }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full flex items-center gap-2 shadow-lg transition-colors z-50"
    >
      <Plus className="h-5 w-5" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};

export default FloatingActionButton;
