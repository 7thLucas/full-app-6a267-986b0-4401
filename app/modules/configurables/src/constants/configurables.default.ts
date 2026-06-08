/*
 * Default Configurable Data — seeded into Mongo on first boot.
 *
 * BEFORE EDITING: read ./RULES.md (especially R5: schema and defaults must
 * stay in sync) and ./configurables.schema.ts. For per-type schema and
 * default-value samples, see RULES.md §5 "Field Type Reference".
 */

export type TBrandColor = {
  primary: string;
  secondary: string;
  accent: string;
};

export type TExtendedColors = {
  background?: string;
  surface?: string;
  textPrimary?: string;
  textMuted?: string;
  success?: string;
  warning?: string;
  destructive?: string;
};

export type TFeatureHighlight = {
  icon: string;
  title: string;
  description?: string;
};

export type TDefaultConfigurableData = {
  appName: string;
  logoUrl: string;
  brandColor: TBrandColor;
  tagline?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  uploadCtaLabel?: string;
  uploadHint?: string;
  footerText?: string;
  colors?: TExtendedColors;
  features?: TFeatureHighlight[];
  maxUploadSizeMb?: number;
  showLandingPage?: boolean;
  showTranscriptSearch?: boolean;
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "MEX",
  logoUrl: "FILL_LOGO_URL_HERE",
  brandColor: {
    primary: "#0F172A",
    secondary: "#1E293B",
    accent: "#6366F1",
  },
  tagline: "Transcribe. Analyze. Understand.",
  heroTitle: "Turn Videos Into Searchable Text",
  heroSubtitle:
    "Upload any audio or video file and get an accurate, timestamped transcript in minutes. Search, export, and share with your team.",
  uploadCtaLabel: "Upload a Video or Audio File",
  uploadHint: "Supports MP4, MOV, MP3, WAV, M4A and more — up to 500 MB",
  footerText: "© 2026 MEX. All rights reserved.",
  colors: {
    background: "#0A0F1E",
    surface: "#1E293B",
    textPrimary: "#F1F5F9",
    textMuted: "#94A3B8",
    success: "#10B981",
    warning: "#F59E0B",
    destructive: "#F43F5E",
  },
  features: [
    {
      icon: "FileVideo",
      title: "Video & Audio Upload",
      description: "Drag and drop any media file for instant processing.",
    },
    {
      icon: "FileText",
      title: "Accurate Transcription",
      description: "AI-powered transcription with timestamped segments.",
    },
    {
      icon: "Search",
      title: "Full-Text Search",
      description: "Search through transcripts instantly across all files.",
    },
    {
      icon: "Download",
      title: "Export & Share",
      description: "Download transcripts as plain text or structured JSON.",
    },
  ],
  maxUploadSizeMb: 500,
  showLandingPage: true,
  showTranscriptSearch: true,
};
