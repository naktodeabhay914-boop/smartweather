import { CloudOff } from 'lucide-react';

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-white/15 bg-white/10 p-10 text-center backdrop-blur-md">
      <CloudOff className="h-12 w-12 text-white/70" />
      <p className="mt-4 text-lg font-medium text-white">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-full border border-white/25 bg-white/15 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/25"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-white/15 bg-white/10 p-10 backdrop-blur-md">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      <p className="mt-4 text-sm text-white/70">Loading weather...</p>
    </div>
  );
}
