import { Github } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="mr-4 hidden md:flex">
          <h1 className="text-xl font-bold">JSON to XML Converter</h1>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="outline" size="icon" asChild>
            <a
              href="https://github.com/anibalalpizar/json-to-xml-converter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
