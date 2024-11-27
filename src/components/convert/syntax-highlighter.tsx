import { Prism as ReactSyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface SyntaxHighlighterProps {
  code: string;
  language: string;
}

const customTheme = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: "transparent",
  },
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: "transparent",
  },
  property: { color: "#e06c75" },
  string: { color: "#98c379" },
  punctuation: { color: "#abb2bf" },
  number: { color: "#d19a66" },
  tag: { color: "#e06c75" },
  "attr-name": { color: "#d19a66" },
};

export function SyntaxHighlighter({ code, language }: SyntaxHighlighterProps) {
  return (
    <ReactSyntaxHighlighter
      language={language}
      style={customTheme}
      customStyle={{
        margin: 0,
        padding: "12px",
        height: "100%",
        background: "transparent",
      }}
    >
      {code}
    </ReactSyntaxHighlighter>
  );
}