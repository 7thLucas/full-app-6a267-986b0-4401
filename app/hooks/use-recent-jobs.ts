import { useEffect, useState } from "react";

export type TranscriptionJob = {
  ticketId: string;
  filename?: string;
  status: string;
  createdAt?: string;
};

export type JobStats = {
  total: number;
  completed: number;
  processing: number;
  failed: number;
};

const STORAGE_KEY = "mex_transcription_jobs";

export function getStoredJobs(): TranscriptionJob[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as TranscriptionJob[];
  } catch {
    return [];
  }
}

export function addStoredJob(job: TranscriptionJob): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getStoredJobs();
    const updated = [job, ...existing.filter((j) => j.ticketId !== job.ticketId)].slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("mex-jobs-updated"));
  } catch {}
}

export function updateStoredJob(ticketId: string, updates: Partial<TranscriptionJob>): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getStoredJobs();
    const updated = existing.map((j) =>
      j.ticketId === ticketId ? { ...j, ...updates } : j,
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("mex-jobs-updated"));
  } catch {}
}

export function useRecentJobs() {
  const [jobs, setJobs] = useState<TranscriptionJob[]>([]);
  const [loading, setLoading] = useState(true);

  const loadJobs = () => {
    setJobs(getStoredJobs());
    setLoading(false);
  };

  useEffect(() => {
    loadJobs();
    window.addEventListener("mex-jobs-updated", loadJobs);
    return () => window.removeEventListener("mex-jobs-updated", loadJobs);
  }, []);

  const stats: JobStats = {
    total: jobs.length,
    completed: jobs.filter((j) => j.status === "completed").length,
    processing: jobs.filter((j) => j.status === "processing" || j.status === "queued").length,
    failed: jobs.filter((j) => j.status === "failed").length,
  };

  return { jobs, stats, loading };
}
