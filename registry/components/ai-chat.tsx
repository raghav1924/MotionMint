"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import type { AIMessage } from "@/lib/ai/types";
import { StreamingMessage } from "@/registry/components/streaming-message";
import { AIPromptComposer } from "@/registry/components/ai-prompt-composer";
import { ThinkingLoader } from "@/registry/components/thinking-loader";

export interface AIChatProps {
  initialMessages?: AIMessage[];
  isLoading?: boolean;
  onSendMessage?: (prompt: string) => void;
  demoNotice?: string;
  className?: string;
}

export function AIChat({
  initialMessages = [],
  isLoading = false,
  onSendMessage,
  demoNotice,
  className,
}: AIChatProps) {
  const [messages, setMessages] = useState<AIMessage[]>(initialMessages);

  const handleSubmit = (prompt: string) => {
    const userMsg: AIMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: prompt,
      status: "complete",
    };
    setMessages((prev) => [...prev, userMsg]);
    onSendMessage?.(prompt);
  };

  return (
    <div
      className={cn(
        "flex w-full max-w-2xl flex-col overflow-hidden rounded-[var(--mm-radius-lg,20px)] border border-[var(--mm-border-strong,rgba(255,255,255,0.16))] bg-[var(--mm-bg,#09090b)] text-[var(--mm-fg,#fafafa)]",
        className
      )}
    >
      {demoNotice && (
        <div className="border-b border-[var(--mm-border,rgba(255,255,255,0.08))] bg-[var(--mm-surface-subtle,#141418)] px-4 py-2 text-[11px] font-mono text-[var(--mm-fg-muted,#a1a1aa)]">
          {demoNotice}
        </div>
      )}

      <div className="flex-1 space-y-4 p-4 max-h-80 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="py-10 text-center text-xs text-[var(--mm-fg-subtle,#71717a)]">
            No messages yet. Send a prompt below to begin.
          </p>
        ) : (
          messages.map((m) => <StreamingMessage key={m.id} message={m} />)
        )}

        {isLoading && (
          <div className="pt-1">
            <ThinkingLoader variant="orbit" />
          </div>
        )}
      </div>

      <div className="border-t border-[var(--mm-border,rgba(255,255,255,0.08))] p-3">
        <AIPromptComposer onSubmit={handleSubmit} isStreaming={isLoading} />
      </div>
    </div>
  );
}
