// src/routes/router.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import History from "../pages/History";
import Alerts from "../pages/Alerts";
import VitalDetails from "../pages/VitalDetails";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="history" element={<History />} />
      <Route path="alerts" element={<Alerts />} />
      <Route path="history/:type" element={<VitalDetails />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
