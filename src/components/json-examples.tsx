"use client";

import { Button } from "./ui/button";

const examples = [
  {
    title: "Simple Object",
    json: `{
  "name": "John Doe",
  "age": 30,
  "city": "New York"
}`,
  },
  {
    title: "Array of Objects",
    json: `{
  "users": [
    {
      "id": 1,
      "name": "Alice",
      "email": "alice@example.com"
    },
    {
      "id": 2,
      "name": "Bob",
      "email": "bob@example.com"
    }
  ]
}`,
  },
  {
    title: "Nested Structure",
    json: `{
  "company": {
    "name": "Tech Corp",
    "location": {
      "city": "San Francisco",
      "country": "USA"
    },
    "employees": 500
  }
}`,
  },
  {
    title: "Mixed Types",
    json: `{
  "product": {
    "id": "123",
    "name": "Laptop",
    "price": 999.99,
    "inStock": true,
    "tags": ["electronics", "computers"],
    "specs": {
      "cpu": "Intel i7",
      "ram": "16GB"
    }
  }
}`,
  },
];

interface JsonExamplesProps {
  onExampleClick: (json: string) => void;
}

export function JsonExamples({ onExampleClick }: JsonExamplesProps) {
  return (
    <footer className="container mx-auto p-4 mt-8">
      <div className="border-t pt-8">
        <h2 className="text-center text-lg font-semibold mb-2">
          Try these examples
        </h2>
        <p className="text-center text-sm text-muted-foreground mb-6">
          Click on any example below to load it into the editor
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {examples.map((example, index) => (
            <div key={index} className="group relative" title={example.title}>
              <Button
                variant="outline"
                className="w-10 h-10"
                onClick={() => onExampleClick(example.json)}
              >
                {index + 1}
              </Button>
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2 bg-popover rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <p className="text-sm font-medium text-center">
                  {example.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
