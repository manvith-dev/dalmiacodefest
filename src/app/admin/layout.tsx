import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/admin/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-grid flex min-h-screen w-full flex-col">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
