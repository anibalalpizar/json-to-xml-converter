export const JSON_EXAMPLES = [
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

export const SITE_CONFIG = {
  title: "JSON to XML Converter - Free Online Tool",
  description:
    "Convert JSON to XML online with our free, fast, and easy-to-use tool. Features real-time conversion, syntax highlighting, and shareable links. Try it now!",
  keywords: [
    "json to xml",
    "xml converter",
    "json converter",
    "online converter",
    "free converter",
    "json formatter",
    "xml formatter",
    "data conversion",
    "web tools",
    "developer tools",
  ],
  url: "https://json-to-xml.vercel.app",
  twitterHandle: "@yourtwitterhandle",
  author: "Your Name",
  locale: "en_US",
  themeColor: "#000000",
  alternateLanguages: [
    { code: "en", name: "English", url: "https://json-to-xml.vercel.app" },
  ],
};
