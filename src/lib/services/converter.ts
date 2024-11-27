import * as xmlJs from "xml-js";
import type { JsonToXmlResponse } from "@/types";

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
    } catch (error) {
      return {
        success: false,
        error: `Error converting JSON to XML: ${error.message}`,
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
    } catch {
      throw new Error("Invalid JSON format");
    }
  }
}
