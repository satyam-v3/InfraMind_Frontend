// import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner, Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Alerts from "./pages/Alerts";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";
import Sensors from "./pages/Sensors";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import NotFoundDashboard from "./pages/NotFoundDashboard";
import ProtectedRoute from "./components/ProtectedRoutes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster
        position="top-right"
        richColors
        duration={1000}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
            <Route path="/rooms" element={<DashboardLayout><Rooms /></DashboardLayout>} />
            <Route path="/alerts" element={<DashboardLayout><Alerts /></DashboardLayout>} />
            <Route path="/analytics" element={<DashboardLayout><Analytics /></DashboardLayout>} />
            <Route path="/users" element={<DashboardLayout><Users /></DashboardLayout>} />
            <Route path="/sensors" element={<DashboardLayout><Sensors /></DashboardLayout>} />
            <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
            <Route path="/help" element={<DashboardLayout><Help /></DashboardLayout>} />
          </Route>
          <Route path="*" element={<DashboardLayout><NotFoundDashboard /></DashboardLayout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
