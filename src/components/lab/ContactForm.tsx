"use client";

import { useState } from "react";
import { contactIntents } from "@/lib/site";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      intent: String(form.get("intent") ?? ""),
      body: String(form.get("body") ?? ""),
      website: String(form.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "Unable to send message.");
        return;
      }
      setStatus("ok");
      setMessage("Message received.");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Try email directly.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 border border-black/15 p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm text-[var(--mute)]">
          Name
          <input
            name="name"
            required
            maxLength={120}
            className="mt-1 min-h-[var(--touch)] w-full border border-black/15 bg-transparent px-3 py-2 text-base text-[var(--ink)]"
          />
        </label>
        <label className="block text-sm text-[var(--mute)]">
          Email
          <input
            name="email"
            type="email"
            required
            maxLength={200}
            className="mt-1 min-h-[var(--touch)] w-full border border-black/15 bg-transparent px-3 py-2 text-base text-[var(--ink)]"
          />
        </label>
      </div>
      <label className="block text-sm text-[var(--mute)]">
        Intent
        <select
          name="intent"
          required
          className="mt-1 min-h-[var(--touch)] w-full border border-black/15 bg-transparent px-3 py-2 text-base text-[var(--ink)]"
          defaultValue=""
        >
          <option value="" disabled>
            Select intent
          </option>
          {contactIntents.map((intent) => (
            <option key={intent} value={intent}>
              {intent}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm text-[var(--mute)]">
        Message
        <textarea
          name="body"
          required
          rows={6}
          maxLength={5000}
          className="mt-1 min-h-[var(--touch)] w-full border border-black/15 bg-transparent px-3 py-2 text-base text-[var(--ink)]"
        />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button
        type="submit"
        disabled={status === "loading"}
        className="touch-target min-h-[var(--touch)] bg-[var(--ink)] px-5 py-2.5 font-[family-name:var(--font-display)] text-sm font-bold text-[var(--paper)] disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send"}
      </button>
      {message ? (
        <p className={`text-sm ${status === "ok" ? "text-[var(--domain-infra)]" : "text-[var(--domain-research)]"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
