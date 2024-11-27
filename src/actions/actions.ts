"use server";

import * as xmlJs from "xml-js";

export async function convertJsonToXml(jsonString: string): Promise<string> {
  try {
    const jsonObj = JSON.parse(jsonString);

    const options = {
      compact: true,
      ignoreComment: true,
      spaces: 2,
    };

    const result = xmlJs.js2xml(jsonObj, options);
    return result;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Error converting JSON to XML: ${errorMessage}`);
  }
}
