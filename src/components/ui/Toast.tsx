"use client";

interface ToastProps {
  message: string;
}

export default function Toast({
  message,
}: ToastProps) {
  return (
    <div className="fixed top-24 left-1/2 z-[120] w-[90%] max-w-md -translate-x-1/2">
      <div className="panel soft-glow flex items-center gap-4 px-5 py-4">
        <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse-soft" />

        <p className="text-sm font-medium">
          {message}
        </p>
      </div>
    </div>
  );
}