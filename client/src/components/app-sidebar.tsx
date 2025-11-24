import { Home, Users, Building2, FileQuestion, Scale, FileCheck, BarChart3 } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Teams", url: "/teams", icon: Users },
  { title: "Companies", url: "/companies", icon: Building2 },
  { title: "Problems", url: "/problems", icon: FileQuestion },
  { title: "Judges", url: "/judges", icon: Scale },
  { title: "Submissions", url: "/submissions", icon: FileCheck },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar className="border-r border-border/50 bg-sidebar/95 backdrop-blur supports-[backdrop-filter]:bg-sidebar/60">
      <SidebarHeader className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-chart-4 text-primary-foreground shadow-lg shadow-primary/25">
            <Building2 className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold bg-gradient-to-r from-primary to-chart-4 bg-clip-text text-transparent">Smart City</span>
            <span className="text-xs text-muted-foreground font-medium">Hackathon Platform</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider px-4 py-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-1">
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`link-${item.title.toLowerCase()}`}
                    className={`
                      w-full justify-start gap-3 px-3 py-2 rounded-lg transition-all duration-200
                      ${location === item.url 
                        ? "bg-primary/10 text-primary font-semibold shadow-sm" 
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:translate-x-1"
                      }
                    `}
                  >
                    <Link href={item.url} className="flex items-center">
                      <item.icon className={`h-5 w-5 ${location === item.url ? "text-primary" : "text-muted-foreground/70"}`} />
                      <span>{item.title}</span>
                      {location === item.url && (
                        <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
