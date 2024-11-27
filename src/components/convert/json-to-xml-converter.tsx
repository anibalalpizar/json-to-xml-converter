'use client'

import { useState, useCallback } from "react";
import { JsonInput } from "./json-input";
import { XmlOutput } from "./xml-output";
import { ExamplesSection } from "./examples-section";
import { Button } from "@/components/ui/button";
import { ConverterService } from "@/lib/services/converter";

export function JsonToXmlConverter() {
  const [jsonInput, setJsonInput] = useState("");
  const [xmlOutput, setXmlOutput] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleJsonChange = useCallback(async (value: string) => {
    setJsonInput(value);
    if (!value) {
      setJsonError(null);
      setXmlOutput("");
      return;
    }

    setIsLoading(true);
    try {
      const result = await ConverterService.jsonToXml(value);
      if (result.success && result.xml) {
        setXmlOutput(result.xml);
        setJsonError(null);
      } else {
        setJsonError(result.error || "Unknown error occurred");
        setXmlOutput("Please fix the JSON errors before converting");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleClear = useCallback(() => {
    setJsonInput("");
    setXmlOutput("");
    setJsonError(null);
  }, []);

  const handleFormat = useCallback(() => {
    try {
      const formatted = ConverterService.formatJson(jsonInput);
      setJsonInput(formatted);
      setJsonError(null);
    } catch (error) {
      setJsonError("Unable to format: Invalid JSON");
    }
  }, [jsonInput]);

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <JsonInput
            value={jsonInput}
            onChange={handleJsonChange}
            onFormat={handleFormat}
            error={jsonError}
          />
          <XmlOutput
            value={xmlOutput}
            isLoading={isLoading}
          />
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <Button variant="outline" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </div>

      <ExamplesSection onExampleClick={handleJsonChange} />
    </>
  );
}