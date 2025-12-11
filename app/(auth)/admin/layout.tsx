import React from "react";
import AdminHeader from "./AdminHeader";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <AdminHeader />
      <SidebarProvider>
        <div className="flex w-full">
          <AppSidebar />
          <main className="flex-1">
            <div className="p-4">
              {/* <SidebarTrigger className="mb-4" /> */}
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
