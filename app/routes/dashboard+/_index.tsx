import { Link } from "react-router";
import { FileVideo, FileText, Clock, CheckCircle, Loader, AlertCircle, Plus } from "lucide-react";
import { useConfigurables } from "~/modules/configurables";
import { useAuth } from "~/modules/authentication/use-authentication";
import { useRecentJobs } from "~/hooks/use-recent-jobs";

function StatCard({
  icon: Icon,
  label,
  value,
  color = "text-primary",
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
        </div>
        <div className={`rounded-lg bg-white/[0.04] p-2.5 ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string; icon: React.ElementType }> = {
    completed: {
      label: "Completed",
      className: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      icon: CheckCircle,
    },
    processing: {
      label: "Processing",
      className: "bg-primary/10 text-primary border border-primary/20",
      icon: Loader,
    },
    queued: {
      label: "Queued",
      className: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
      icon: Clock,
    },
    failed: {
      label: "Failed",
      className: "bg-destructive/10 text-destructive border border-destructive/20",
      icon: AlertCircle,
    },
  };

  const config = map[status] ?? map.queued;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${config.className}`}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}

export default function DashboardIndex() {
  const { config, loading: configLoading } = useConfigurables();
  const { user } = useAuth();
  const { jobs, stats, loading: jobsLoading } = useRecentJobs();

  const appName = configLoading ? "MEX" : (config?.appName ?? "MEX");

  return (
    <div className="flex flex-col gap-6 overflow-y-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back{user?.username ? `, ${user.username}` : ""}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening with your transcriptions in {appName}.
          </p>
        </div>
        <Link
          to="/dashboard/transcribe"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary/90 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          New Transcription
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={FileVideo}
          label="Total Files"
          value={jobsLoading ? "—" : stats.total}
          color="text-primary"
        />
        <StatCard
          icon={CheckCircle}
          label="Completed"
          value={jobsLoading ? "—" : stats.completed}
          color="text-emerald-400"
        />
        <StatCard
          icon={Loader}
          label="Processing"
          value={jobsLoading ? "—" : stats.processing}
          color="text-amber-400"
        />
        <StatCard
          icon={AlertCircle}
          label="Failed"
          value={jobsLoading ? "—" : stats.failed}
          color="text-destructive"
        />
      </div>

      {/* Recent jobs */}
      <div className="rounded-xl border border-white/[0.08] bg-card">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <h2 className="text-sm font-semibold text-foreground">Recent Transcriptions</h2>
          <Link
            to="/dashboard/files"
            className="text-xs font-medium text-primary hover:text-primary/80"
          >
            View all
          </Link>
        </div>

        {jobsLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
            <FileText className="h-10 w-10 text-muted-foreground/40" />
            <div>
              <p className="text-sm font-medium text-foreground">No transcriptions yet</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Upload a video or audio file to get started.
              </p>
            </div>
            <Link
              to="/dashboard/transcribe"
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-xs font-medium text-primary transition hover:bg-primary/20"
            >
              <Plus className="h-3.5 w-3.5" />
              Start transcribing
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {jobs.slice(0, 8).map((job) => (
              <Link
                key={job.ticketId}
                to={`/dashboard/files/${job.ticketId}`}
                className="flex items-center gap-4 px-5 py-3.5 transition hover:bg-white/[0.02]"
              >
                <div className="rounded-lg bg-primary/10 p-2">
                  <FileVideo className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {job.filename ?? job.ticketId}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {job.createdAt
                      ? new Date(job.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—"}
                  </p>
                </div>
                <StatusBadge status={job.status} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
