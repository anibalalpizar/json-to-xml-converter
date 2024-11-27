import { useCallback } from "react";
import { FileJson } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SyntaxHighlighter } from "./syntax-highlighter";

interface JsonInputProps {
  value: string;
  onChange: (value: string) => void;
  onFormat: () => void;
  error?: string | null;
}

export function JsonInput({
  value,
  onChange,
  onFormat,
  error,
}: JsonInputProps) {
  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          onChange(content);
        };
        reader.readAsText(file);
      }
    },
    [onChange]
  );

  return (
    <div className="space-y-4">
      <div className="relative h-[400px] font-mono rounded-md border dark:bg-[#09090B] bg-[#FFFFFF] overflow-hidden">
        <div className="absolute inset-0 overflow-auto">
          <div className="relative min-h-full w-full">
            <SyntaxHighlighter code={value || " "} language="json" />
            <textarea
              placeholder="Paste your JSON here..."
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="absolute top-0 left-0 w-full h-full resize-none bg-transparent p-3 font-mono text-transparent caret-black dark:caret-white focus:outline-none selection:bg-blue-500/50"
              style={{
                WebkitTextFillColor: "transparent",
              }}
            />
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm"
          onClick={onFormat}
          title="Format JSON"
        >
          <FileJson className="h-4 w-4" />
        </Button>
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}

      <div className="flex justify-center space-x-4">
        <label htmlFor="json-file" className="cursor-pointer">
          <Button
            variant="outline"
            onClick={() => document.getElementById("json-file")?.click()}
          >
            Upload JSON
          </Button>
        </label>
        <input
          id="json-file"
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
}
