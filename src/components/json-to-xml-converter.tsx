"use client";

import { convertJsonToXml } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { JsonExamples } from "./json-examples";
import { Loader2, FileJson } from "lucide-react";

export function JsonToXmlConverter() {
  const [jsonInput, setJsonInput] = useState("");
  const [xmlOutput, setXmlOutput] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      validateAndConvert(jsonInput);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [jsonInput]);

  const validateAndConvert = async (input: string) => {
    if (!input) {
      setJsonError(null);
      setXmlOutput("");
      return;
    }

    setIsLoading(true);
    try {
      JSON.parse(input);
      setJsonError(null);
      const result = await convertJsonToXml(input);
      setXmlOutput(result);
    } catch (error) {
      setJsonError(error.message);
      setXmlOutput("Please fix the JSON errors before converting");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setJsonInput("");
    setXmlOutput("");
    setJsonError(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setJsonInput(content);
      };
      reader.readAsText(file);
    }
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonInput(formatted);
      setJsonError(null);
    } catch (error) {
      setJsonError("Unable to format: Invalid JSON");
    }
  };

  const handleExampleClick = (json: string) => {
    setJsonInput(json);
  };

  const customTheme = {
    ...oneDark,
    'pre[class*="language-"]': {
      ...oneDark['pre[class*="language-"]'],
      background: "transparent",
    },
    'code[class*="language-"]': {
      ...oneDark['code[class*="language-"]'],
      background: "transparent",
    },
    property: { color: "#e06c75" },
    string: { color: "#98c379" },
    punctuation: { color: "#abb2bf" },
    number: { color: "#d19a66" },
    tag: { color: "#e06c75" },
    "attr-name": { color: "#d19a66" },
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative h-[400px] font-mono rounded-md border dark:bg-[#09090B] bg-[#FFFFFF] overflow-hidden">
              <div className="absolute inset-0 overflow-auto">
                <div className="relative min-h-full w-full">
                  <SyntaxHighlighter
                    language="json"
                    style={customTheme}
                    customStyle={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      margin: 0,
                      padding: "12px",
                      background: "transparent",
                      pointerEvents: "none",
                    }}
                  >
                    {jsonInput || " "}
                  </SyntaxHighlighter>
                  <textarea
                    placeholder="Paste your JSON here..."
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
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
                onClick={formatJson}
                title="Format JSON"
              >
                <FileJson className="h-4 w-4" />
              </Button>
            </div>
            {jsonError && (
              <p className="text-destructive text-sm">{jsonError}</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="relative h-[400px] font-mono rounded-md border dark:bg-[#09090B] bg-[#FFFFFF] overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
              )}
              <div className="absolute inset-0 overflow-auto">
                <SyntaxHighlighter
                  language="xml"
                  style={customTheme}
                  customStyle={{
                    margin: 0,
                    padding: "12px",
                    height: "100%",
                    background: "transparent",
                  }}
                >
                  {xmlOutput || " "}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <Button variant="outline" onClick={handleClear}>
            Clear
          </Button>
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

      <JsonExamples onExampleClick={handleExampleClick} />
    </>
  );
}
