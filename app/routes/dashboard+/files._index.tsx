import { Link } from "react-router";
import {
  FileVideo,
  FileText,
  CheckCircle,
  Loader,
  Clock,
  AlertCircle,
  Plus,
  Trash2,
} from "lucide-react";
import { useRecentJobs } from "~/hooks/use-recent-jobs";
import { getStoredJobs } from "~/hooks/use-recent-jobs";

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
      <Icon className={`h-3 w-3 ${status === "processing" ? "animate-spin" : ""}`} />
      {config.label}
    </span>
  );
}

export default function FilesPage() {
  const { jobs, loading } = useRecentJobs();

  const clearAll = () => {
    localStorage.removeItem("mex_transcription_jobs");
    window.dispatchEvent(new Event("mex-jobs-updated"));
  };

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <div className="sticky top-0 z-10 border-b border-white/[0.06] bg-background/80 px-6 py-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">My Files</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              All your transcription jobs
            </p>
          </div>
          <div className="flex items-center gap-3">
            {jobs.length > 0 && (
              <button
                onClick={clearAll}
                className="flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-xs font-medium text-muted-foreground transition hover:border-destructive/30 hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear all
              </button>
            )}
            <Link
              to="/dashboard/transcribe"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              New
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/[0.04]">
              <FileText className="h-8 w-8 text-muted-foreground/40" />
            </div>
            <div>
              <p className="text-base font-semibold text-foreground">No files yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Start by uploading a video or audio file.
              </p>
            </div>
            <Link
              to="/dashboard/transcribe"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              Upload your first file
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-white/[0.08]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    File
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Date
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {jobs.map((job) => (
                  <tr
                    key={job.ticketId}
                    className="transition hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <FileVideo className="h-4 w-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">
                            {job.filename ?? "Untitled"}
                          </p>
                          <p className="truncate text-xs font-mono text-muted-foreground/60">
                            {job.ticketId}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={job.status} />
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">
                      {job.createdAt
                        ? new Date(job.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        to={`/dashboard/files/${job.ticketId}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-white/[0.08]"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
