import { useState } from "react";
import { useNavigate } from "react-router";
import { FileVideo, ArrowRight, Info } from "lucide-react";
import { TranscriptionUpload } from "~/modules/audio-analyzer/src/components/transcription-upload";
import { useTranscribe } from "~/modules/audio-analyzer/src/hooks/use-transcribe";
import { addStoredJob } from "~/hooks/use-recent-jobs";
import { useConfigurables } from "~/modules/configurables";

export default function TranscribePage() {
  const navigate = useNavigate();
  const { config, loading: configLoading } = useConfigurables();
  const { submit, isSubmitting, ticketId, error } = useTranscribe();
  const [submitted, setSubmitted] = useState(false);

  const uploadCtaLabel = configLoading
    ? "Upload a Video or Audio File"
    : (config?.uploadCtaLabel ?? "Upload a Video or Audio File");

  const uploadHint = configLoading
    ? "Supports MP4, MOV, MP3, WAV, M4A and more"
    : (config?.uploadHint ?? "Supports MP4, MOV, MP3, WAV, M4A and more");

  const handleUpload = async (file: File) => {
    try {
      const result = await submit({ files: file });
      if (result?.ticket_id) {
        const id = result.ticket_id;
        addStoredJob({
          ticketId: id,
          filename: file.name,
          status: "queued",
          createdAt: new Date().toISOString(),
        });
        setSubmitted(true);
        setTimeout(() => navigate(`/dashboard/files/${id}`), 800);
      }
    } catch {}
  };

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <div className="mx-auto w-full max-w-2xl px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <FileVideo className="h-3.5 w-3.5" />
            New Transcription
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Transcribe a File
          </h1>
          <p className="mt-2 text-muted-foreground">
            Upload a video or audio file and our AI will generate an accurate, timestamped transcript.
          </p>
        </div>

        {/* Upload area */}
        <div className="rounded-2xl border border-white/[0.08] bg-card p-6">
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
                <ArrowRight className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-base font-semibold text-foreground">
                  File submitted!
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Redirecting to your transcription…
                </p>
              </div>
            </div>
          ) : (
            <>
              <TranscriptionUpload
                onUpload={handleUpload}
                isLoading={isSubmitting}
                label={uploadCtaLabel}
                hint={uploadHint}
                loadingLabel="Uploading and queueing…"
                draggingLabel="Drop your file here"
                className="min-h-[200px]"
              />

              {error && (
                <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}
            </>
          )}
        </div>

        {/* Tips */}
        <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Info className="h-3.5 w-3.5" />
            Tips for best results
          </div>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-primary">•</span>
              Use clear audio with minimal background noise
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-primary">•</span>
              Supported formats: MP4, MOV, AVI, MKV, MP3, WAV, M4A, FLAC
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-primary">•</span>
              Longer files take more time — a 1-hour video may take a few minutes
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-primary">•</span>
              Results include timestamps and an AI quality analysis
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
