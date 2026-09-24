import Link from "next/link";

export default function NotFound() {
  return (
    <div className="world-paper flex min-h-screen items-center justify-center page-pad">
      <div className="max-w-xl text-center">
        <p className="eyebrow text-[var(--mute)]">Node not found</p>
        <h1 className="display display-md mt-6">
          The requested node does not exist in the current graph.
        </h1>
        <div className="mt-10 flex justify-center gap-6 font-[family-name:var(--font-display)] font-semibold">
          <Link href="/archive">Search archive</Link>
          <Link href="/">Return home</Link>
        </div>
      </div>
    </div>
  );
}
