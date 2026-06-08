import { useState, useMemo } from "react";
import { Link } from "react-router";
import { Search, FileVideo, Clock, ArrowRight, SlidersHorizontal } from "lucide-react";
import { useRecentJobs } from "~/hooks/use-recent-jobs";
import { useConfigurables } from "~/modules/configurables";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const { jobs, loading } = useRecentJobs();
  const { config, loading: configLoading } = useConfigurables();

  const searchEnabled = configLoading ? true : (config?.showTranscriptSearch ?? true);

  const filtered = useMemo(() => {
    if (!query.trim()) return jobs;
    const q = query.toLowerCase();
    return jobs.filter(
      (job) =>
        (job.filename ?? "").toLowerCase().includes(q) ||
        job.ticketId.toLowerCase().includes(q),
    );
  }, [query, jobs]);

  if (!searchEnabled) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Search is disabled.
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Search header */}
      <div className="border-b border-white/[0.06] bg-background/80 px-6 py-4 backdrop-blur">
        <h1 className="mb-3 text-xl font-bold text-foreground">Search</h1>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by filename or ticket ID…"
            autoFocus
            className="w-full rounded-xl border border-white/[0.08] bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none transition focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
          />
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : !query.trim() ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.04]">
              <SlidersHorizontal className="h-7 w-7 text-muted-foreground/40" />
            </div>
            <div>
              <p className="text-base font-semibold text-foreground">Search your files</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Type a filename or ticket ID to find your transcriptions.
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              {jobs.length} file{jobs.length !== 1 ? "s" : ""} available
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <Search className="h-10 w-10 text-muted-foreground/30" />
            <div>
              <p className="text-base font-semibold text-foreground">No results</p>
              <p className="mt-1 text-sm text-muted-foreground">
                No files matched &quot;{query}&quot;.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="mb-4 text-xs text-muted-foreground">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &quot;{query}&quot;
            </p>
            {filtered.map((job) => (
              <Link
                key={job.ticketId}
                to={`/dashboard/files/${job.ticketId}`}
                className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-card px-4 py-3 transition hover:border-primary/20 hover:bg-primary/5"
              >
                <div className="rounded-lg bg-primary/10 p-2">
                  <FileVideo className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {job.filename ?? "Untitled"}
                  </p>
                  <p className="flex items-center gap-1.5 truncate text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {job.createdAt
                      ? new Date(job.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                    <span className="mx-1 opacity-40">·</span>
                    <span className="font-mono">{job.ticketId.slice(0, 12)}…</span>
                  </p>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                    job.status === "completed"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : job.status === "failed"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-amber-500/10 text-amber-400"
                  }`}
                >
                  {job.status}
                </span>
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted-foreground/40" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
