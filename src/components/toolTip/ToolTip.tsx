import React from "react";

interface ToolTipProps {
  message: string;
  children: React.ReactNode;
}

export default function ToolTip({ message, children }: ToolTipProps) {
  return (
    <div className="group relative flex">
      {children}
      <span className="absolute top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 hidden lg:block">
        {message}
      </span>
    </div>
  );
}
