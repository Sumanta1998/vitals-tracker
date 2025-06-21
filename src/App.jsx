// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Alerts from "./pages/Alerts";
import VitalDetails from "./pages/VitalDetails";
import NotFound from "./pages/NotFound";
import router from "./routes/router";

export default function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Layout />}>
    //       <Route index element={<Dashboard />} />
    //       <Route path="history" element={<History />} />
    //       <Route path="alerts" element={<Alerts />} />
    //       <Route path="history/:type" element={<VitalDetails />} />
    //     </Route>
    //   </Routes>
    // </Router>
    <RouterProvider router={router} />
  );
}
