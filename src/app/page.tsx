import { JsonToXmlConverter } from "@/components/json-to-xml-converter";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">JSON to XML Converter</h1>
      <JsonToXmlConverter />
    </main>
  );
}
