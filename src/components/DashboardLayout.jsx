import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAlertsSocket } from "@/features/alerts/alerts.socket";
import { useSensorsSocket } from "@/features/sensors/sensors.socket";
import { useRoomsSocket } from "@/features/rooms/rooms.socket";

export function DashboardLayout({ children }) {
  useRoomsSocket();
  useSensorsSocket();
  useAlertsSocket();
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border bg-card flex items-center px-4 gap-4 sticky top-0 z-10">
            <SidebarTrigger className="hover:bg-accent/10" />
            <div className="flex-1" />
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
