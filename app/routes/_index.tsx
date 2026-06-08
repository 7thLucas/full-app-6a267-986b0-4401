import { Link } from "react-router";
import {
  FileVideo,
  FileText,
  Search,
  Download,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useConfigurables } from "~/modules/configurables";
import { useAuth } from "~/modules/authentication/use-authentication";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-card/50 p-5 backdrop-blur-sm transition hover:border-primary/20 hover:bg-card">
      <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2.5">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

const iconMap: Record<string, React.ElementType> = {
  FileVideo,
  FileText,
  Search,
  Download,
  CheckCircle,
};

export default function IndexPage() {
  const { config, loading } = useConfigurables();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const showLandingPage = loading ? true : (config?.showLandingPage ?? true);

  // Redirect authenticated users directly to dashboard
  useEffect(() => {
    if (!authLoading && isAuthenticated && !showLandingPage) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, authLoading, showLandingPage, navigate]);

  const appName = loading ? "MEX" : (config?.appName ?? "MEX");
  const heroTitle = loading
    ? "Turn Videos Into Searchable Text"
    : (config?.heroTitle ?? "Turn Videos Into Searchable Text");
  const heroSubtitle = loading
    ? "Upload any audio or video file and get an accurate, timestamped transcript in minutes."
    : (config?.heroSubtitle ??
      "Upload any audio or video file and get an accurate, timestamped transcript in minutes.");
  const tagline = loading
    ? "Transcribe. Analyze. Understand."
    : (config?.tagline ?? "Transcribe. Analyze. Understand.");
  const footerText = loading
    ? `© ${new Date().getFullYear()} MEX. All rights reserved.`
    : (config?.footerText ?? `© ${new Date().getFullYear()} MEX. All rights reserved.`);

  const features = loading
    ? []
    : (config?.features ?? [
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
      ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <FileVideo className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-bold tracking-tight text-foreground">
              {appName}
            </span>
          </div>
          <p className="hidden text-sm text-muted-foreground sm:block">{tagline}</p>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90"
              >
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                >
                  Sign in
                </Link>
                <Link
                  to="/auth/register"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute top-20 right-1/4 h-[300px] w-[300px] rounded-full bg-violet-500/5 blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            AI-Powered Video Transcription
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {heroTitle}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {heroSubtitle}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {isAuthenticated ? (
              <Link
                to="/dashboard/transcribe"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90 active:scale-95"
              >
                Start Transcribing
                <ArrowRight className="h-5 w-5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/auth/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90 active:scale-95"
                >
                  Get started free
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/auth/login"
                  className="rounded-xl border border-white/[0.08] px-7 py-3.5 text-base font-medium text-muted-foreground transition hover:border-white/20 hover:text-foreground"
                >
                  Sign in
                </Link>
              </>
            )}
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            {[
              "Timestamped transcripts",
              "AI quality analysis",
              "Export to text/JSON",
              "Secure & private",
            ].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      {features.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Everything you need
              </h2>
              <p className="mt-3 text-muted-foreground">
                A complete toolset for video transcription and analysis.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => {
                const Icon = iconMap[feature.icon] ?? FileVideo;
                return (
                  <FeatureCard
                    key={feature.title}
                    icon={Icon}
                    title={feature.title}
                    description={feature.description ?? ""}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA section */}
      <section className="py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-10">
            <h2 className="text-2xl font-bold text-foreground">
              Ready to transcribe?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Start for free and turn your video content into searchable text.
            </p>
            {isAuthenticated ? (
              <Link
                to="/dashboard/transcribe"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90"
              >
                Go to Transcribe
                <ArrowRight className="h-5 w-5" />
              </Link>
            ) : (
              <Link
                to="/auth/register"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90"
              >
                Create your account
                <ArrowRight className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
                <FileVideo className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold text-foreground">{appName}</span>
            </div>
            <p className="text-xs text-muted-foreground">{footerText}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
