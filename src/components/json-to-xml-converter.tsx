"use client";

import { convertJsonToXml } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function JsonToXmlConverter() {
  const [jsonInput, setJsonInput] = useState("");
  const [xmlOutput, setXmlOutput] = useState("");

  const handleConvert = async () => {
    try {
      const result = await convertJsonToXml(jsonInput);
      setXmlOutput(result);
    } catch (error) {
      setXmlOutput("Error: Invalid JSON input");
    }
  };

  const handleClear = () => {
    setJsonInput("");
    setXmlOutput("");
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

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <label htmlFor="json-file" className="cursor-pointer">
            <Button
              variant="outline"
              onClick={() => document.getElementById("json-file")?.click()}
            >
              Upload JSON File
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
        <Textarea
          placeholder="Paste your JSON here..."
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="min-h-[200px] font-mono"
        />
      </div>

      <div className="flex space-x-2">
        <Button onClick={handleConvert}>Convert to XML</Button>
        <Button variant="outline" onClick={handleClear}>
          Clear
        </Button>
      </div>

      <div className="flex flex-col space-y-2">
        <Textarea
          placeholder="XML output will appear here..."
          value={xmlOutput}
          readOnly
          className="min-h-[200px] font-mono"
        />
      </div>
    </div>
  );
}
