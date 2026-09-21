"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Trash2, Check, RefreshCw } from "lucide-react";
import type { ContactMessage } from "@/types";

export function MessagesList() {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const refreshMessages = useCallback(async () => {
    setRefreshing(true);
    setError("");

    try {
      const res = await fetch("/api/admin/messages", {
        cache: "no-store",
        credentials: "include",
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(
          typeof data?.error === "string"
            ? data.error
            : "Could not load messages. Please log in again."
        );
        return;
      }

      if (!Array.isArray(data)) {
        setError("Unexpected response from server.");
        return;
      }

      setMessages(data);
      setSelected((current) => {
        if (!current) return data[0] || null;
        return data.find((msg) => msg.id === current.id) || data[0] || null;
      });
    } catch {
      setError("Network error while loading messages.");
    } finally {
      setLoading(false);
      setRefreshing(false);
      router.refresh();
    }
  }, [router]);

  useEffect(() => {
    refreshMessages();
  }, [refreshMessages]);

  useEffect(() => {
    const interval = setInterval(refreshMessages, 30000);
    return () => clearInterval(interval);
  }, [refreshMessages]);

  const markRead = async (id: string, read: boolean) => {
    await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
      credentials: "include",
    });
    await refreshMessages();
  };

  const deleteMsg = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/admin/messages/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    setSelected(null);
    await refreshMessages();
  };

  return (
    <div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-muted">
          {loading
            ? "Loading messages..."
            : `${messages.length} message${messages.length === 1 ? "" : "s"}`}
        </p>
        <button
          type="button"
          onClick={refreshMessages}
          disabled={refreshing}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-accent-blue hover:text-white disabled:opacity-50"
        >
          <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {loading ? (
        <div className="mt-8 rounded-2xl border border-border p-12 text-center text-muted">
          Loading messages from database...
        </div>
      ) : messages.length === 0 && !error ? (
        <div className="mt-8 rounded-2xl border border-border p-12 text-center text-muted">
          <Mail size={40} className="mx-auto mb-4 opacity-50" />
          No messages yet. Contact form submissions will appear here.
        </div>
      ) : (
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
      )}
    </div>
  );
}
