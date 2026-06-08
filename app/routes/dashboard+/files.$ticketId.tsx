import { useParams, Link } from "react-router";
import { ArrowLeft, Download } from "lucide-react";
import { TranscriptionResult } from "~/modules/audio-analyzer/src/components/transcription-result";
import { useTranscriptionResult } from "~/modules/audio-analyzer/src/hooks/use-transcription-result";
import { updateStoredJob, getStoredJobs } from "~/hooks/use-recent-jobs";
import { useEffect } from "react";

function ExportButton({ ticketId }: { ticketId: string }) {
  const { result } = useTranscriptionResult(ticketId, { enabled: false });

  const handleExport = () => {
    const jobs = getStoredJobs();
    const job = jobs.find((j) => j.ticketId === ticketId);
    const filename = job?.filename ?? ticketId;
    // Build a simple text download from stored context
    const blob = new Blob(
      [`Transcription ID: ${ticketId}\nFilename: ${filename}\n\nExport requires the transcription to be completed.\n`],
      { type: "text/plain" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}-transcript.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-white/[0.04] hover:text-foreground"
    >
      <Download className="h-4 w-4" />
      Export
    </button>
  );
}

export default function FileDetailPage() {
  const { ticketId } = useParams<{ ticketId: string }>();

  if (!ticketId) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Invalid ticket ID.
      </div>
    );
  }

  return <FileDetailContent ticketId={ticketId} />;
}

function FileDetailContent({ ticketId }: { ticketId: string }) {
  const jobs = getStoredJobs();
  const job = jobs.find((j) => j.ticketId === ticketId);
  const { result } = useTranscriptionResult(ticketId);

  // Keep local job status in sync
  useEffect(() => {
    if (result?.status) {
      updateStoredJob(ticketId, { status: result.status });
    }
  }, [ticketId, result?.status]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center gap-4 border-b border-white/[0.06] bg-background/80 px-6 py-3 backdrop-blur">
        <Link
          to="/dashboard/files"
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <div className="h-4 w-px bg-white/[0.08]" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            {job?.filename ?? ticketId}
          </p>
          <p className="truncate font-mono text-xs text-muted-foreground">
            {ticketId}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ExportButton ticketId={ticketId} />
        </div>
      </div>

      {/* Transcription result */}
      <div className="flex-1 overflow-y-auto p-6">
        <TranscriptionResult ticketId={ticketId} className="mx-auto max-w-4xl">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {job?.filename ?? "Transcription"}
                </h2>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{ticketId}</p>
              </div>
              <TranscriptionResult.Status />
            </div>

            <TranscriptionResult.Loading />
            <TranscriptionResult.Error />

            <TranscriptionResult.Stage />

            <TranscriptionResult.Content>
              <div className="space-y-6">
                <TranscriptionResult.Media />
                <TranscriptionResult.Transcript />
                <TranscriptionResult.Summary />
                <TranscriptionResult.Scores />
                <TranscriptionResult.Issues />
                <TranscriptionResult.Strengths />
              </div>
            </TranscriptionResult.Content>

            <TranscriptionResult.Logs />
          </div>
        </TranscriptionResult>
      </div>
    </div>
  );
}
