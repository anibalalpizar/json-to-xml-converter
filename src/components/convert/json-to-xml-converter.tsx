"use client";

import { useState, useCallback, useEffect } from "react";
import { JsonInput } from "./json-input";
import { XmlOutput } from "./xml-output";
import { ExamplesSection } from "./examples-section";
import { Button } from "@/components/ui/button";
import { ConverterService } from "@/lib/services/converter";
import { generateShareableUrl } from "@/lib/utils";
import { Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface JsonToXmlConverterProps {
  initialJson?: string;
}

export function JsonToXmlConverter({ initialJson }: JsonToXmlConverterProps) {
  const [jsonInput, setJsonInput] = useState(initialJson || "");
  const [xmlOutput, setXmlOutput] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (initialJson) {
      handleJsonChange(initialJson);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialJson]);

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
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setJsonError(errorMessage);
      setXmlOutput("An error occurred during conversion");
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
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to format: Invalid JSON";
      setJsonError(errorMessage);
    }
  }, [jsonInput]);

  const handleShare = useCallback(() => {
    if (!jsonInput) return;
    const shareableUrl = generateShareableUrl(jsonInput);
    navigator.clipboard.writeText(shareableUrl).then(() => {
      toast({
        title: "Link copied!",
        description: "The shareable URL has been copied to your clipboard.",
      });
    });
  }, [jsonInput, toast]);

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
          <XmlOutput value={xmlOutput} isLoading={isLoading} />
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <Button variant="outline" onClick={handleClear}>
            Clear
          </Button>
          <Button
            variant="outline"
            onClick={handleShare}
            disabled={!jsonInput || !!jsonError}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <ExamplesSection onExampleClick={handleJsonChange} />
    </>
  );
}
