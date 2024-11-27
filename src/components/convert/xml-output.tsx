import { Loader2 } from "lucide-react";
import { SyntaxHighlighter } from "./syntax-highlighter";

interface XmlOutputProps {
  value: string;
  isLoading: boolean;
}

export function XmlOutput({ value, isLoading }: XmlOutputProps) {
  return (
    <div className="space-y-4">
      <div className="relative h-[400px] font-mono rounded-md border dark:bg-[#09090B] bg-[#FFFFFF] overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        )}
        <div className="absolute inset-0 overflow-auto">
          <SyntaxHighlighter code={value || " "} language="xml" />
        </div>
      </div>
    </div>
  );
}
