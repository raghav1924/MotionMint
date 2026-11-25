"use client";

import React, { useRef, useState, useCallback, useId } from "react";
import { UploadCloud, FileText, X, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface DropzoneProps {
  accept?: string | string[];
  maxSize?: number;
  multiple?: boolean;
  disabled?: boolean;
  label?: string;
  helperText?: string;
  sound?: boolean;
  haptic?: boolean;
  onFilesChange?: (files: File[]) => void;
  className?: string;
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), units.length - 1);
  const val = bytes / Math.pow(k, i);
  return `${val % 1 === 0 ? val : val.toFixed(1)} ${units[i]}`;
}

function matchesAccept(file: File, acceptTokens: string[]): boolean {
  if (acceptTokens.length === 0) return true;
  const fileName = file.name.toLowerCase();
  const mime = file.type.toLowerCase();

  return acceptTokens.some((token) => {
    const t = token.trim().toLowerCase();
    if (!t) return true;
    if (t.startsWith(".")) {
      return fileName.endsWith(t);
    }
    if (t.endsWith("/*")) {
      const prefix = t.slice(0, -1);
      return mime.startsWith(prefix);
    }
    return mime === t;
  });
}

export function Dropzone({
  accept,
  maxSize = 5 * 1024 * 1024,
  multiple = false,
  disabled = false,
  label = "Drop files here or click to browse",
  helperText,
  sound,
  haptic,
  onFilesChange,
  className,
}: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const errorId = useId();
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const acceptString = Array.isArray(accept) ? accept.join(",") : accept;
  const acceptTokens = acceptString
    ? acceptString
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const processIncoming = useCallback(
    (incomingList: FileList | File[]) => {
      if (disabled) return;
      const incoming = Array.from(incomingList);
      if (incoming.length === 0) return;

      const candidates = multiple ? incoming : [incoming[0]];
      const valid: File[] = [];
      const errors: string[] = [];

      for (const file of candidates) {
        if (!matchesAccept(file, acceptTokens)) {
          errors.push(`"${file.name}" is not an accepted file type.`);
          continue;
        }
        if (maxSize > 0 && file.size > maxSize) {
          errors.push(
            `"${file.name}" (${formatBytes(file.size)}) exceeds the ${formatBytes(maxSize)} limit.`
          );
          continue;
        }
        valid.push(file);
      }

      if (errors.length > 0) {
        setErrorMessage(errors[0]);
        triggerInteractionFeedback("error", { sound, haptic });
      } else {
        setErrorMessage(null);
      }

      if (valid.length > 0) {
        const nextFiles = multiple ? [...files, ...valid] : [valid[0]];
        setFiles(nextFiles);
        onFilesChange?.(nextFiles);
        if (errors.length === 0) {
          triggerInteractionFeedback("drop", { sound, haptic });
        }
      }
    },
    [acceptTokens, disabled, files, haptic, maxSize, multiple, onFilesChange, sound]
  );

  const handleRemove = (index: number) => {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    setErrorMessage(null);
    onFilesChange?.(next);
    triggerInteractionFeedback("click", { sound, haptic });
  };

  const openPicker = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openPicker();
    }
  };

  const status: "idle" | "drag-over" | "success" | "error" = errorMessage
    ? "error"
    : isDragOver
      ? "drag-over"
      : files.length > 0
        ? "success"
        : "idle";

  const defaultHelper = [
    acceptTokens.length > 0 ? `Accepted: ${acceptTokens.join(", ")}` : "Any file type",
    maxSize > 0 ? `Max ${formatBytes(maxSize)}` : null,
    multiple ? "Multiple files allowed" : "Single file",
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className={cn("w-full space-y-3", className)}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-label={label}
        aria-describedby={errorMessage ? errorId : undefined}
        onClick={openPicker}
        onKeyDown={handleKeyDown}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragOver(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          if (!disabled && e.dataTransfer?.files) {
            processIncoming(e.dataTransfer.files);
          }
        }}
        className={cn(
          "flex flex-col items-center justify-center gap-2.5 p-6 text-center transition-colors select-none",
          "rounded-[var(--mm-radius,14px)] border-2 border-dashed cursor-pointer",
          "bg-[var(--mm-surface-subtle,#141418)] shadow-[var(--mm-shadow,none)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mm-ring,#10b981)]",
          status === "idle" &&
            "border-[var(--mm-border-strong,rgba(255,255,255,0.2))] hover:border-[var(--mm-accent,#10b981)]",
          status === "drag-over" &&
            "border-[var(--mm-accent,#10b981)] bg-[var(--mm-accent-soft,rgba(16,185,129,0.12))]",
          status === "success" && "border-[var(--mm-accent,#10b981)]",
          status === "error" && "border-red-500 bg-red-500/5",
          disabled && "opacity-50 pointer-events-none cursor-not-allowed"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={acceptString}
          multiple={multiple}
          disabled={disabled}
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only"
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            if (e.target.files) {
              processIncoming(e.target.files);
            }
            e.target.value = "";
          }}
        />

        {status === "error" ? (
          <AlertCircle className="h-7 w-7 text-red-400" aria-hidden="true" />
        ) : status === "success" ? (
          <CheckCircle2 className="h-7 w-7 text-[var(--mm-accent,#10b981)]" aria-hidden="true" />
        ) : (
          <UploadCloud className="h-7 w-7 text-[var(--mm-accent,#10b981)]" aria-hidden="true" />
        )}

        <div className="space-y-1">
          <p className="text-sm font-medium text-[var(--mm-fg,#fafafa)]">{label}</p>
          <p className="text-xs text-[var(--mm-fg-muted,#a1a1aa)]">
            {helperText ?? defaultHelper}
          </p>
        </div>
      </div>

      {errorMessage && (
        <p
          id={errorId}
          role="alert"
          className="flex items-center gap-1.5 text-xs font-medium text-red-400"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </p>
      )}

      {files.length > 0 && (
        <ul className="space-y-1.5" aria-label="Selected files">
          {files.map((file, idx) => (
            <li
              key={`${file.name}-${file.size}-${idx}`}
              className="flex items-center justify-between gap-3 rounded-[var(--mm-radius-sm,8px)] border border-[var(--mm-border,rgba(255,255,255,0.1))] bg-[var(--mm-surface,#111114)] px-3 py-2 text-xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <FileText
                  className="h-4 w-4 shrink-0 text-[var(--mm-accent,#10b981)]"
                  aria-hidden="true"
                />
                <span className="truncate font-medium text-[var(--mm-fg,#fafafa)]">
                  {file.name}
                </span>
                <span className="shrink-0 text-[var(--mm-fg-subtle,#71717a)]">
                  {formatBytes(file.size)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                aria-label={`Remove ${file.name}`}
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--mm-radius-sm,8px)] text-[var(--mm-fg-muted,#a1a1aa)] hover:text-[var(--mm-fg,#fafafa)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mm-ring,#10b981)]"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
