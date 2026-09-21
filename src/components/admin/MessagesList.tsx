"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Trash2, Check } from "lucide-react";
import type { ContactMessage } from "@/types";

export function MessagesList({ messages }: { messages: ContactMessage[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<ContactMessage | null>(
    messages[0] || null
  );

  const markRead = async (id: string, read: boolean) => {
    await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });
    router.refresh();
  };

  const deleteMsg = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    setSelected(null);
    router.refresh();
  };

  if (messages.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-border p-12 text-center text-muted">
        <Mail size={40} className="mx-auto mb-4 opacity-50" />
        No messages yet. Contact form submissions will appear here.
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-3">
      <div className="space-y-2 lg:col-span-1">
        {messages.map((msg) => (
          <button
            key={msg.id}
            type="button"
            onClick={() => {
              setSelected(msg);
              if (!msg.read) markRead(msg.id, true);
            }}
            className={`w-full rounded-xl border p-4 text-left transition-colors ${
              selected?.id === msg.id
                ? "border-accent-blue bg-accent-blue/10"
                : "border-border bg-surface-elevated hover:border-white/20"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold text-white">{msg.name}</p>
              {!msg.read && (
                <span className="h-2 w-2 rounded-full bg-accent-blue" />
              )}
            </div>
            <p className="mt-1 truncate text-xs text-muted">{msg.email}</p>
            <p className="mt-1 text-xs text-muted">
              {new Date(msg.createdAt).toLocaleDateString("en-IN")}
            </p>
          </button>
        ))}
      </div>

      {selected && (
        <div className="rounded-2xl border border-border bg-surface-elevated p-6 lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold">{selected.name}</h2>
              <p className="text-sm text-muted">{selected.email}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => markRead(selected.id, !selected.read)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:border-green-400"
                title="Mark read/unread"
              >
                <Check size={16} />
              </button>
              <button
                type="button"
                onClick={() => deleteMsg(selected.id)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-red-400 hover:border-red-400"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            <p><span className="text-muted">Phone:</span> {selected.phone || "—"}</p>
            <p><span className="text-muted">Company:</span> {selected.company || "—"}</p>
            <p><span className="text-muted">Service:</span> {selected.service || "—"}</p>
            <p><span className="text-muted">Budget:</span> {selected.budget || "—"}</p>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-background p-4">
            <p className="text-sm leading-relaxed text-muted">{selected.message}</p>
          </div>

          <p className="mt-4 text-xs text-muted">
            Received: {new Date(selected.createdAt).toLocaleString("en-IN")}
          </p>
        </div>
      )}
    </div>
  );
}
