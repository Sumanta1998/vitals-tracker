import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { AddVitalsModal } from "./AddVitalsModal";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f9fdff] relative">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 h-[100vh] overflow-auto z-10 relative">
        <div className="md:hidden bg-white p-4 shadow flex items-center gap-2 justify-start">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <Link to="/" className="text-xl font-bold text-gray-800">
            Vitals Tracker
          </Link>
        </div>

        <main className="p-4">
          <Outlet context={{ showAddModal, setShowAddModal }} />
        </main>
      </div>

      <AddVitalsModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
}
