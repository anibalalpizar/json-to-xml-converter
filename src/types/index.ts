export interface JsonToXmlResponse {
  success: boolean;
  xml?: string;
  error?: string;
}

export interface ConversionError {
  message: string;
  code: string;
}
