import { JsonToXmlConverter } from "@/components/convert/json-to-xml-converter";
import { decodeJsonFromUrl } from "@/lib/utils";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const jsonFromUrl = params.json
    ? decodeJsonFromUrl(params.json as string)
    : undefined;

  return (
    <main className="min-h-[calc(100vh-4rem)]">
      <JsonToXmlConverter initialJson={jsonFromUrl} />
    </main>
  );
}
