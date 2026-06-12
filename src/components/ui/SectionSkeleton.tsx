export default function SectionSkeleton({ className = "min-h-[320px]" }: { className?: string }) {
  return (
    <div
      className={`section-padding animate-pulse ${className}`}
      aria-hidden
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 h-4 w-24 rounded bg-ice/10" />
        <div className="mb-4 h-10 w-64 max-w-full rounded bg-ice/10" />
        <div className="h-4 w-96 max-w-full rounded bg-ice/5" />
      </div>
    </div>
  );
}
