"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CheckCircle2, FileText, RefreshCw, Trash2, UploadCloud, AlertCircle } from "lucide-react";

export type UploadItemStatus = "queued" | "uploading" | "complete" | "error";

export interface UploadQueueItem {
  id: string;
  name: string;
  sizeLabel: string;
  progress: number;
  status: UploadItemStatus;
}

export interface AdvancedUploadFlowProps {
  initialFiles?: UploadQueueItem[];
  allowRetry?: boolean;
  soundEnabled?: boolean;
  className?: string;
}

const DEFAULT_FILES: UploadQueueItem[] = [
  { id: "u1", name: "design-tokens-v4.json", sizeLabel: "42 KB", progress: 100, status: "complete" },
  { id: "u2", name: "hero-shader-pass.glsl", sizeLabel: "18 KB", progress: 64, status: "uploading" },
  { id: "u3", name: "motion-specs.pdf", sizeLabel: "1.4 MB", progress: 35, status: "error" },
];

/**
 * Multi-file upload flow with per-file progress rings, retry recovery,
 * and live-region status announcements.
 */
export function AdvancedUploadFlow({
  initialFiles = DEFAULT_FILES,
  allowRetry = true,
  className = "",
}: AdvancedUploadFlowProps) {
  const prefersReduced = useReducedMotion();
  const [files, setFiles] = useState<UploadQueueItem[]>(initialFiles);
  const [announcement, setAnnouncement] = useState("");
  const counterRef = useRef(4);

  useEffect(() => {
    setFiles(initialFiles);
  }, [initialFiles]);

  const addDemoFile = () => {
    const id = `u${counterRef.current++}`;
    const next: UploadQueueItem = {
      id,
      name: `bundle-chunk-${counterRef.current}.tsx`,
      sizeLabel: "24 KB",
      progress: 0,
      status: "queued",
    };
    setFiles((prev) => [...prev, next]);
    setAnnouncement(`Queued ${next.name}`);
  };

  const startAll = () => {
    setFiles((prev) =>
      prev.map((f) =>
        f.status === "queued" || f.status === "uploading"
          ? { ...f, progress: 100, status: "complete" }
          : f
      )
    );
    setAnnouncement("Completed queued uploads.");
  };

  const retryFile = (id: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, progress: 100, status: "complete" } : f))
    );
    setAnnouncement("Retried upload succeeded.");
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setAnnouncement("Removed file from queue.");
  };

  return (
    <div
      className={`w-full max-w-md rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 text-[var(--mm-fg)] shadow-sm space-y-3 ${className}`.trim()}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <UploadCloud className="h-4 w-4 text-[var(--mm-accent)]" aria-hidden="true" />
          <span className="text-sm font-semibold">Upload Queue ({files.length})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={addDemoFile}
            className="rounded-lg border border-[var(--mm-border)] bg-[var(--mm-bg)] px-2.5 py-1 text-xs font-medium hover:opacity-85 cursor-pointer"
          >
            + File
          </button>
          <button
            type="button"
            onClick={startAll}
            className="rounded-lg bg-[var(--mm-accent)] px-2.5 py-1 text-xs font-medium text-[var(--mm-accent-fg)] hover:opacity-90 cursor-pointer"
          >
            Upload All
          </button>
        </div>
      </div>

      <ul className="space-y-2" aria-label="Upload files">
        {files.map((file) => {
          const r = 10;
          const circ = 2 * Math.PI * r;
          const offset = circ - (file.progress / 100) * circ;
          return (
            <motion.li
              key={file.id}
              layout={!prefersReduced}
              initial={prefersReduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between gap-3 rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-2 text-xs"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <FileText className="h-4 w-4 shrink-0 text-[var(--mm-fg-muted)]" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="truncate font-medium">{file.name}</p>
                  <p className="text-[11px] text-[var(--mm-fg-muted)]">
                    {file.sizeLabel} · {file.status}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {file.status === "complete" ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-label="Complete" />
                ) : file.status === "error" ? (
                  <div className="flex items-center gap-1">
                    <AlertCircle className="h-4 w-4 text-rose-500" aria-label="Error" />
                    {allowRetry && (
                      <button
                        type="button"
                        onClick={() => retryFile(file.id)}
                        aria-label={`Retry ${file.name}`}
                        className="rounded p-1 hover:bg-[var(--mm-surface)] cursor-pointer"
                      >
                        <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" aria-label={`${file.progress}%`}>
                    <circle
                      cx="12"
                      cy="12"
                      r={r}
                      fill="none"
                      stroke="currentColor"
                      strokeOpacity="0.18"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r={r}
                      fill="none"
                      stroke="var(--mm-accent)"
                      strokeWidth="2.5"
                      strokeDasharray={circ}
                      strokeDashoffset={offset}
                      transform="rotate(-90 12 12)"
                    />
                  </svg>
                )}

                <button
                  type="button"
                  onClick={() => removeFile(file.id)}
                  aria-label={`Remove ${file.name}`}
                  className="rounded p-1 text-[var(--mm-fg-muted)] hover:text-[var(--mm-fg)] cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </motion.li>
          );
        })}
      </ul>

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </div>
  );
}
