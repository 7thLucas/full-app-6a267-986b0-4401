import { Link, useLocation, Form } from "react-router";
import {
  LayoutDashboard,
  FileVideo,
  Search,
  Settings,
  LogOut,
  FileText,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { useConfigurables } from "~/modules/configurables";
import { useAuth } from "~/modules/authentication/use-authentication";
import { cn } from "~/lib/utils";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Transcribe", icon: FileVideo, to: "/dashboard/transcribe" },
  { label: "My Files", icon: FileText, to: "/dashboard/files" },
  { label: "Search", icon: Search, to: "/dashboard/search" },
];

const adminNavItems = [
  { label: "Admin Panel", icon: Settings, to: "/admin" },
];

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  to: string;
  collapsed: boolean;
  active: boolean;
};

function NavItem({ icon: Icon, label, to, collapsed, active }: NavItemProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
        collapsed && "justify-center px-2",
      )}
      title={collapsed ? label : undefined}
    >
      <Icon className="h-4 w-4 flex-shrink-0" />
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { config, loading } = useConfigurables();
  const { isAdmin } = useAuth();
  const location = useLocation();

  const appName = loading ? "MEX" : (config?.appName ?? "MEX");

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-white/[0.08] bg-[#0F172A] transition-all duration-200",
        collapsed ? "w-16" : "w-60",
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex h-16 items-center border-b border-white/[0.08] px-4",
          collapsed ? "justify-center" : "justify-between",
        )}
      >
        {!collapsed && (
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <FileVideo className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-bold tracking-tight text-foreground">
              {appName}
            </span>
          </Link>
        )}
        {collapsed && (
          <Link to="/dashboard">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <FileVideo className="h-4 w-4 text-white" />
            </div>
          </Link>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className={cn(
            "rounded-md p-1 text-muted-foreground transition hover:bg-white/5 hover:text-foreground",
            collapsed && "absolute -right-3 top-5 z-10 rounded-full border border-white/10 bg-[#0F172A] p-0.5 shadow",
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            icon={item.icon}
            label={item.label}
            to={item.to}
            collapsed={collapsed}
            active={
              item.to === "/dashboard"
                ? location.pathname === "/dashboard"
                : location.pathname.startsWith(item.to)
            }
          />
        ))}

        {isAdmin && (
          <>
            <div
              className={cn(
                "my-2 border-t border-white/[0.06]",
                collapsed && "mx-1",
              )}
            />
            {adminNavItems.map((item) => (
              <NavItem
                key={item.to}
                icon={item.icon}
                label={item.label}
                to={item.to}
                collapsed={collapsed}
                active={location.pathname.startsWith(item.to)}
              />
            ))}
          </>
        )}
      </nav>

      {/* Footer / Logout */}
      <div className="border-t border-white/[0.08] p-3">
        <Form method="post" action="/auth/logout">
          <button
            type="submit"
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-white/5 hover:text-destructive",
              collapsed && "justify-center px-2",
            )}
            title={collapsed ? "Sign out" : undefined}
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span>Sign out</span>}
          </button>
        </Form>
      </div>
    </aside>
  );
}
