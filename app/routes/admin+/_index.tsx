import { Settings, Users, Activity, Server, Shield } from "lucide-react";
import { useConfigurables } from "~/modules/configurables";

function AdminCard({
  icon: Icon,
  title,
  description,
  value,
  color = "text-primary",
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  value?: string;
  color?: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className={`rounded-lg bg-white/[0.04] p-2 ${color}`}>
          <Icon className="h-4 w-4" />
        </div>
        {value && (
          <span className="text-xl font-bold text-foreground">{value}</span>
        )}
      </div>
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

export default function AdminIndex() {
  const { config, loading } = useConfigurables();
  const appName = loading ? "MEX" : (config?.appName ?? "MEX");

  return (
    <div className="flex flex-1 flex-col overflow-y-auto p-6">
      <div className="mb-8">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Shield className="h-3.5 w-3.5" />
          Admin Access
        </div>
        <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage {appName} — users, system status, and configuration.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AdminCard
          icon={Users}
          title="User Management"
          description="View and manage registered users, roles, and access."
          color="text-primary"
        />
        <AdminCard
          icon={Activity}
          title="System Activity"
          description="Monitor transcription jobs and processing queues."
          color="text-emerald-400"
        />
        <AdminCard
          icon={Server}
          title="Service Health"
          description="Check audio analyzer microservice connectivity."
          color="text-amber-400"
        />
        <AdminCard
          icon={Settings}
          title="Configuration"
          description="Manage app configurables including branding and feature flags."
          color="text-violet-400"
        />
      </div>

      {/* System status */}
      <div className="mt-6 rounded-xl border border-white/[0.08] bg-card p-5">
        <h2 className="mb-4 text-sm font-semibold text-foreground">System Information</h2>
        <div className="space-y-3">
          {[
            { label: "App Name", value: appName },
            { label: "Environment", value: typeof process !== "undefined" ? (process.env?.NODE_ENV ?? "unknown") : "client" },
            { label: "Auth System", value: "JWT + httpOnly cookies" },
            { label: "Storage", value: "MongoDB (Mongoose + Typegoose)" },
            { label: "Transcription Engine", value: "qb-micro-audio-analyzer-service" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between border-b border-white/[0.04] pb-3 last:border-0 last:pb-0">
              <span className="text-sm text-muted-foreground">{label}</span>
              <span className="font-mono text-xs text-foreground">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
