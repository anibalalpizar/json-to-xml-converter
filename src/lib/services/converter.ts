import * as xmlJs from "xml-js";
import { JsonToXmlResponse } from "@/types";

export class ConverterService {
  static async jsonToXml(jsonString: string): Promise<JsonToXmlResponse> {
    try {
      const jsonObj = JSON.parse(jsonString);

      const options = {
        compact: true,
        ignoreComment: true,
        spaces: 2,
      };

      const xml = xmlJs.js2xml(jsonObj, options);
      return {
        success: true,
        xml,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return {
        success: false,
        error: `Error converting JSON to XML: ${errorMessage}`,
      };
    }
  }

  static validateJson(jsonString: string): boolean {
    try {
      JSON.parse(jsonString);
      return true;
    } catch {
      return false;
    }
  }

  static formatJson(jsonString: string): string {
    try {
      const parsed = JSON.parse(jsonString);
      return JSON.stringify(parsed, null, 2);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Invalid JSON format";
      throw new Error(errorMessage);
    }
  }
}
