import { JsonToXmlConverter } from "@/components/convert/json-to-xml-converter";
import { decodeJsonFromUrl } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Home({ searchParams }: any) {
  const jsonFromUrl = (await searchParams.json)
    ? decodeJsonFromUrl(searchParams.json as string)
    : undefined;

  return (
    <main className="min-h-[calc(100vh-4rem)]">
      <JsonToXmlConverter initialJson={jsonFromUrl} />
    </main>
  );
}
