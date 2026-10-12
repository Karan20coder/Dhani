import { useState } from "react";
import { Component } from "@/components/ui/area-chart";
import { cn } from "@/lib/utils";

const IncidentReportCardSmallDemo = () => {
  const [isDarkMode] = useState(true);

  return (
    <div
      className={cn(
        "flex flex-col w-full min-h-screen justify-center items-center p-4 transition-colors duration-300",
        isDarkMode ? "dark bg-gray-900" : "bg-gray-100"
      )}
    >
      <Component isDarkMode={isDarkMode} />
    </div>
  );
};

export { IncidentReportCardSmallDemo };
